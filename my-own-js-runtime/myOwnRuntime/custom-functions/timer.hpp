
uv_loop_t *loop;

struct timer {
    uv_timer_t uvTimer;
    v8::Isolate *isolate;
    v8::Global<v8::Function> callback;
};

class Timer {
    public:
        static void Init(uv_loop_t *evloop) {
            loop = evloop;
        }

        static void Timeout(const v8::FunctionCallbackInfo<v8::Value> &args) {
            auto isolate = args.GetIsolate();
            auto context = isolate->GetCurrentContext();
            int64_t sleep = args[0]->IntegerValue(context).ToChecked();
            int64_t interval = args[1]->IntegerValue(context).ToChecked();

            v8::Local<v8::Value> callback = args[2];
            if (!callback->IsFunction()) {
                printf("Callback not declared!");
                return;
            }

            timer *timerWrap = new timer();
            timerWrap->callback.Reset(isolate, callback.As<v8::Function>());
            timerWrap->uvTimer.data = (void *)timerWrap;
            timerWrap->isolate = isolate;

            uv_timer_init(loop, &timerWrap->uvTimer);
            uv_timer_start(&timerWrap->uvTimer, onTimerCallback, sleep, interval);
        }

        static void onTimerCallback(uv_timer_t *handle) {
            timer *timerWrap = (timer *)handle->data;
            v8::Isolate *isolate = timerWrap->isolate;
            v8::Local<v8::Context> context = isolate->GetCurrentContext();

            if (isolate->IsDead()) {
                printf("Isolate is not alive");
                return;
            }

            v8::Local<v8::Function> callback = v8::Local<v8::Function>::New(isolate, timerWrap->callback);
            v8::Local<v8::Value> result;

            auto callbackIsOK = callback->Call(
                context,
                v8::Undefined(isolate),
                0,
                NULL
            ).ToLocal(&result);

            if (!callbackIsOK) {
                printf("Error to run callback function");
            }
        }
};
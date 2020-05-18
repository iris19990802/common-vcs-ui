# Progress
参考http://ricostacruz.com/nprogress/的交互及API。

```js
import Progress from '@/components/progress';

Progress.start();
Progress.done();
Progress.set(30); // 这里不同nprogress，直接设置0-100之间的值
Progress.inc();
```

### API
- start()
| param | Type | default | Description |
| ---- -| ---- | ------- | ----------- |
| spiner | boolean | false | 是否显示右侧转动loading | 
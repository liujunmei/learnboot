/**
 * 定义一个“类”Timer
 */
var Timer = {
    /**
     * Timer“类”的公用数据（JAVA中的static）
     */
    task: 0,
    times: 0,
    /**
     * 生成一个实例对象并返回给外部
     * 只要没有定义在timerObj对象上的属性和方法，都是私有属性和私有方法（比如:_loop）
     */
    createTimer: function(options){
        var timerObj = {},//定义需要返回的实例对象
            _loop = function(){//定义私有方法
                options.func();
                Timer.task = setTimeout(_loop, options.period);
            };
        //定义实例对象的属性和方法
        timerObj.period = options.period;
        timerObj.func = options.func;
        timerObj.count = options.count;
        timerObj.start = function(){
            Timer.task = setTimeout(_loop, timerObj.period);
        };
        timerObj.stop = function(){
            if(Timer.task){
                clearTimeout(Timer.task);
            }
        };
        timerObj.restart = function(){
            timerObj.stop();
            timerObj.start();
        };
        //返回实例对象
        return timerObj;
    }
};
var opts1 = {
    period: 1000,
    func: function(){
        console.log('aaa');
    }
},opts2 = {
    period: 2000,
    func: function(){
        console.log('bbb');
    }
};
/**
 * 调用
 * @type {*}
 */
var timer1 = Timer.createTimer(opts1);
var timer2 = Timer.createTimer(opts2);
timer1.start();
timer2.start();
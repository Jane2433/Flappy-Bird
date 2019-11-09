(function () {
    var Game = window.Game = function (id) {
        // 获取画布
        this.canvas = document.querySelector(id);
        // 上下文
        this.ctx = this.canvas.getContext('2d');
        // 设置宽、高
        this.init();
        // 帧编号
        this.fon = 0;
        // 得分
        this.score = 0;
        // 异步加载资源
        var _this = this;
        this.loadRS(function () {
            // 开始游戏
            _this.start();
        })
    }
    Game.prototype.init = function () {
        // 获取屏幕宽高
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        // 可以限制宽高范围（这里就不限制了）
        // if(windowW > 420){
        //     windowW = 420;
        // } else if(windowW < 320){
        //     windowW = 320;
        // }
        // if(windowH > 650){
        //     windowH = 650;
        // }else if(windowH < 500){
        //     windowH = 500;
        // }
        // 赋值
        this.canvas.width = windowW;
        this.canvas.height = windowH;
    }
    Game.prototype.loadRS = function (callback) {
        // 存放资源
        this.R = {};
        var _this = this;
        // ajax 请求 R.json 文件
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // 已加载资源数量
                var readyRs = 0;
                var oR = JSON.parse(xhr.responseText);
                for (var i = 0; i < oR.images.length; i++) {
                    // 创建图片对象
                    _this.R[oR.images[i].name] = new Image();
                    // 设置图片路径
                    _this.R[oR.images[i].name].src = oR.images[i].url;
                    // 加载
                    _this.R[oR.images[i].name].onload = function () {
                        readyRs++;
                        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                        // 提示正在加载
                        var text = "正在加载资源 " + readyRs + "/" + oR.images.length + ' 请稍后...';
                        _this.ctx.textAlign = "center";
                        _this.ctx.font = "20px 微软雅黑";
                        _this.ctx.fillText(text, _this.canvas.width / 2, _this.canvas.height * 0.618);
                        // 加载完毕，执行回调
                        if (readyRs == oR.images.length) {
                            callback();
                        }
                    }
                }
            }
        }
        xhr.open('get', 'R.json', true);
        xhr.send(null);
    }
    Game.prototype.start = function () {
        // 实例化场景管理器
        this.sceneManager = new SceneManager();

        var _this = this;
        this.timer = setInterval(function () {
            // 清屏
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            // 渲染场景管理器
            _this.sceneManager.update();
            _this.sceneManager.render();
            // 显示帧编号
            _this.fon++;
            _this.ctx.textAlign = 'left';
            _this.ctx.font = "16px consolas";
            // _this.ctx.fillStyle = "black";
            _this.ctx.fillText("FNO:" + _this.fon, 10, 20);

        }, 20);
    }

})();
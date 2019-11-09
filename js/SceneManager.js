(function () {
    var SceneManager = window.SceneManager = function () {
        // 1表示欢迎页面、2表示游戏内容、3表示GameOver
        this.sceneNum = 1;
        // 实例化背景
        game.background = new BackGround();
        // 实例化大地
        game.land = new Land();

        this.titleY = -48;  // logo 初始高度
        this.btn_startX = game.canvas.width / 2 - 58;
        this.btn_startY = game.canvas.height;   // 开始按钮 初始高度
        this.birdWingStep = 0; // 欢迎页小鸟的状态

        // 实例化小鸟
        game.bird = new Bird();

        // 监听
        this.bindEvent();
    }
    SceneManager.prototype.update = function () {
        switch (this.sceneNum) {
            // 欢迎页面
            case 1: {
                // logo 从上面移下来
                this.titleY += 2;
                if (this.titleY > 160) {
                    this.titleY = 160;
                }
                // 开始按钮从下面上来
                this.btn_startY -= 2;
                if (this.btn_startY < game.canvas.height - 210) {
                    this.btn_startY = game.canvas.height - 210;
                }
                break;
            }
            // 开始游戏
            case 2: {
                // 背景
                game.background.update();
                // 大地
                game.land.update();
                // 小鸟
                game.bird.update();
                // 每隔多少时间出现管子
                if (game.fon % 100 == 0) {
                    new Pipe();
                }
                break;
            }
            // 结束
            case 3: {

            }
        }
    }
    SceneManager.prototype.render = function () {
        switch (this.sceneNum) {
            // 欢迎页面
            case 1: {
                // 渲染背景、大地
                game.background.render();
                game.land.render();
                // 画logo
                game.ctx.drawImage(game.R.title, game.canvas.width / 2 - 89, this.titleY);
                // 画开始按钮
                game.ctx.drawImage(game.R.button_play, this.btn_startX, this.btn_startY);
                // 画只小鸟
                game.fon % 20 == 0 && this.birdWingStep++;
                if (this.birdWingStep > 2) {
                    this.birdWingStep = 0;
                }
                game.ctx.drawImage(game.R['bird0_' + this.birdWingStep], game.canvas.width / 2 - 24, game.canvas.height / 2 - 24);
                break;
            }
            // 开始游戏
            case 2: {
                // 渲染背景
                game.background.render();
                // 渲染大地
                game.land.render();
                // 渲染小鸟
                game.bird.render();
                // 渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                    game.pipeArr[i] && game.pipeArr[i].update();
                }
                // 分数(如何居中)
                var scoreStr = game.score.toString();
                for (var i = 0; i < scoreStr.length; i++) {
                    game.ctx.drawImage(game.R['num' + scoreStr.charAt(i)], game.canvas.width / 2 - scoreStr.length / 2 * 24 + 24 * i, 50);
                }
                break;
            }
            // 结束
            case 3: {
                // 渲染背景
                game.background.render();
                // 渲染大地
                game.land.render();
                // 渲染小鸟
                game.bird.render();
                // 渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                // 分数(如何居中)
                var scoreStr = game.score.toString();
                for (var i = 0; i < scoreStr.length; i++) {
                    game.ctx.drawImage(game.R['num' + scoreStr.charAt(i)], game.canvas.width / 2 - scoreStr.length / 2 * 24 + 24 * i, 50);
                }
                // Game Over
                game.ctx.drawImage(game.R.text_game_over, game.canvas.width / 2 - 102, this.titleY + 100);
                // 画开始按钮
                game.ctx.drawImage(game.R.button_play, this.btn_startX, this.btn_startY);
                break;
            }
        }
    }
    // 进入某个场景
    SceneManager.prototype.enter = function (number) {
        this.sceneNum = number;
        // 进入某场景要从头开始
        switch (this.sceneNum) {
            // 欢迎页面复原
            case 1: {
                this.titleY = -48;
                this.btn_startY = game.canvas.height;
                break;
            }
            // 开始游戏
            case 2: {
                // 重置所有属性
                game.pipeArr = new Array();
                game.fon = 0;
                game.score = 0;
                game.bird.wingStep = 0;
                game.bird.x = game.canvas.width * (1 - 0.618) - 24;
                game.bird.y = 100;
                game.bird.fon = 0;   // 帧数
                game.bird.rotate = 0;    // 旋转角度
                game.bird.energy = false;   // 是否有能量    
                break;
            }

        }
    }
    // 通过点击位置来判断点击的是谁,无法进行dom操作
    SceneManager.prototype.bindEvent = function () {
        var _this = this;
        // 画布点击事件
        game.canvas.onclick = function(evt){
            clickHandler(evt.clientX, evt.clientY);
        }
        // 手机触摸（卡顿）
        // game.canvas.addEventListener('touchstart', function (evt) {
        //     var finger = evt.touches[0];
        //     clickHandler(finger.clientX, finger.clientY);
        // }, true);

        function clickHandler(mouseX, mouseY) {
            switch (_this.sceneNum) {
                case 1: {
                    // 点击开始按钮
                    if (mouseX > _this.btn_startX && mouseX < _this.btn_startX + 116 && mouseY > _this.btn_startY && mouseY < _this.btn_startY + 70) {
                        _this.enter(2);
                    }
                    break;
                }
                case 2: {
                    game.bird.fly();
                    break;
                }
                case 3: {
                    // 点击开始按钮
                    if (mouseX > _this.btn_startX && mouseX < _this.btn_startX + 116 && mouseY > _this.btn_startY && mouseY < _this.btn_startY + 70) {
                        _this.enter(2);
                    }
                    break;
                }
            }
        }
    }

})();
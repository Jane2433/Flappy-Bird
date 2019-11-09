(function () {
    var Pipe = window.Pipe = function () {
        this.imageUp = game.R.pipe_down;
        this.imageDown = game.R.pipe_up;
        // 图片高度
        this.h = 320;
        this.w = 52;

        // 上面管子高度+下面管子高度+空隙，即大地的 y 
        this.allHeight = game.canvas.height * 0.8;
        // 空隙高度
        this.interspace = 120;
        // 上管子高度随机(保证管子至少有150高度)
        this.upHeight = parseInt(Math.random() * (this.h - 150)) + 150;
        // 下馆子高度
        this.downHeight = this.allHeight - this.interspace - this.upHeight;

        // 管子的位置
        this.x = game.canvas.width;

        // 自己是否已经通过
        this.alreadyPass = false;

        // 将自己推入管子数组
        game.pipeArr.push(this);

    }
    Pipe.prototype.render = function () {
        game.ctx.drawImage(this.imageUp, 0, this.h - this.upHeight, this.w, this.upHeight, this.x, 0, this.w, this.upHeight);
        game.ctx.drawImage(this.imageDown, 0, 0, this.w, this.downHeight, this.x, this.upHeight + 120, this.w, this.downHeight);
    }
    Pipe.prototype.update = function () {
        // 检测自己碰撞到鸟（因为鸟只有一个）
        if (game.bird.R > this.x && game.bird.L < this.x + 52) {
            if (game.bird.T < this.upHeight || game.bird.B > this.upHeight + this.interspace) {
                // 进入场景3
                game.sceneManager.enter(3);
            }
        }

        this.x -= 2;
        // 加分
        if (!this.alreadyPass && this.x + 52 < game.bird.x) {
            game.score++;
            this.alreadyPass = true;
        }

        // 出了视口，删除管子（造成管子闪烁）
        if (this.x < -52) {
            for (var i = 0; i < game.pipeArr.length; i++) {
                if (game.pipeArr[i] === this) {
                    game.pipeArr.splice(i, 1);
                }
            }
        }
    }
})();
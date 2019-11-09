(function () {
    var Bird = window.Bird = function () {
        // 3 种翅膀形态
        this.imageArr = [game.R.bird0_0, game.R.bird0_1, game.R.bird0_2];
        // 当前翅膀状态
        this.wingStep = 0;
        this.x = game.canvas.width * (1 - 0.618) - 24;
        this.y = 100;
        this.fon = 0;   // 帧数
        this.rotate = 0;    // 旋转角度
        this.energy = false;   // 是否有能量
    }
    Bird.prototype.render = function () {
        game.ctx.save();
        game.ctx.translate(this.x + 24, this.y + 24);
        game.ctx.rotate(this.rotate);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
        game.ctx.restore();
    }
    Bird.prototype.update = function () {
        // 计算自己的外包矩形值用于碰撞检测
        this.T = this.y + 13;
        this.R = this.x + 40;
        this.B = this.y + 37;
        this.L = this.x + 6;

        // 是否落地
        if (this.B > game.canvas.height * 0.8) {
            // 进入场景3
            game.sceneManager.enter(3);
        }
        // 不能飞天
        if (this.y < 0) {
            this.y = 0;
        }

        // 更新翅膀形态
        game.fon % 20 == 0 && this.wingStep++;
        if (this.wingStep > 2) {
            this.wingStep = 0;
        }

        // 如果有能量，向上抛，真实模拟物理
        if (this.energy) {
            this.y -= 0.2 * (20 - this.fon);    // 这个式子超级厉害！！！！
            // 上到没力气了，就该下降了
            if (this.fon > 20) {
                this.energy = false;
                this.fon = 0;
            }
        } else {
            this.y += this.fon * 0.1;
        }
        this.rotate += 0.02;
        this.fon++;

    }
    Bird.prototype.fly = function () {
        this.energy = true;
        this.rotate = -0.6;
        this.fon = 0;   // 我的天，一个字母要了我的命
    }

})();
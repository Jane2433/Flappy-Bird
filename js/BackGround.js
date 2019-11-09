(function(){
    var BackGround = window.BackGround = function(){
        this.image = game.R.bg_day;
        // 图片距顶部的距离
        this.y = 0.75 * game.canvas.height - 396;
        // 图片的宽高
        this.h = 512;
        this.w = 288;
        // 图片起始位置(场景动实际是背景动)
        this.x = 0;
    }
    BackGround.prototype.render = function(){
        // 背景放置在画布上(图片不够宽，要完全充满屏幕，至少三张图片)
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // 渲染空白部分
        // 天空
        game.ctx.fillStyle = "#4EC0CA";
        game.ctx.fillRect(0, 0, game.canvas.width, this.y);
        // 草地
        game.ctx.fillStyle = "#5EE270";
        game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height - this.y - this.h);

    }
    BackGround.prototype.update = function(){
        this.x--;
        // 跑马灯来让背景来回跑
        if(this.x < -this.w){
            this.x = 0;
        }
    }

})();
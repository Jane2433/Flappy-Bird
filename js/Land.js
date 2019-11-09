(function(){
    var Land = window.Land = function(){
        this.image = game.R.land;
        // 图片的位置
        this.x = 0;
        this.y = game.canvas.height * 0.8;
        // 图片宽度
        this.w = 336;
    }
    Land.prototype.render = function(){
        // 背景放置在画布上(图片不够宽，要完全充满屏幕，至少三张图片)
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // 渲染空白部分
        game.ctx.fillStyle = "#DED895";
        game.ctx.fillRect(0, this.y + 112, game.canvas.width, game.canvas.height - this.y - 112);
    }
    Land.prototype.update = function(){
        this.x -= 2;
        if(this.x < -this.w){
            this.x = 0;
        }
    }
})();
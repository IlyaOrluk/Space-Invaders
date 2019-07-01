let left = 0, right = 0, dir = right - left, bullets = [], invaiders = [],
invGrid = [ 1,1,1,0,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,0]
   
   class Background {
      constructor(color){
        this.canvas = document.querySelector('#canvas');
        this.c = this.canvas.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.color = color;
        this.img = new Image();
        this.img.src = "planet.png";
        this.angle = 0;
      }
      show = () =>{
        this.angle += 0.2;
        this.c.fillStyle = this.color;
        this.c.fillRect(this.x, this.y, this.width, this.height);
        this.c.save();
        this.c.translate(420, this.canvas.height);
        this.c.rotate(this.angle * Math.PI/180);
        this.c.drawImage(this.img, 0, 0, 400, 400, -300, -300, 600, 600); // var - img, cutSizeX, cutSizeY, cutX, cutY, posX, posY, x, y
        this.c.restore();
        
      }
    }
   class Bullet{
      constructor(x, y){
        this.canvas = document.querySelector('#canvas');
        this.c = this.canvas.getContext('2d');
        this.width = 4;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.death = false;
      }
      move = () =>{
        this.y -= this.speed;
        this.bulletDeath();
      }
      bulletDeath = () =>{
        if(this.y < 0){
          this.death = true;
        }
        invaiders.forEach((item) =>{
          if(this.collision(this.x+this.width/2, this.y+2, item)){
            this.death = true;
          }
        });

      }
  

      collision(posX, posY, item){
        if (posX > item.x &&
            posX < item.x + item.width &&
            item.y + item.height > posY &&
            item.y < posY) {
          return true;
        } else {
          return false;

        }
      }
      show = () =>{
        this.c.fillStyle = '#fff'
        this.c.fillRect(this.x,this.y,this.width,this.height);
      }
   }



    class Player {
      constructor(x, y){
        this.canvas = document.querySelector('#canvas');
        this.c = this.canvas.getContext('2d');
        this.width = 40;
        this.height = 70;
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.img = new Image();
        this.img.src = "invaiders.gif";
      }

      show = () =>{
        this.c.drawImage(this.img, 143, 600, 80, 150, this.x, this.y, this.width, this.height); // var - img, cutSizeX, cutSizeY, cutX, cutY, posX, posY, x, y
      }
      freePlace(platform){
        if(platform > 0 &&  platform < this.canvas.width){
            return true;
        } else {
            return false;
        }
      }
      bulletsOut = () =>{
        bullets.forEach((item)=> {
          if(item.death){
            bullets.pop(item);
          }
        })
      }
      control = () =>{
        window.addEventListener('keydown', (e)=>{
          if(e.keyCode == 37){
              left = 1;
          } else if(e.keyCode == 39){
              right = 1;
          }
        });
        window.addEventListener('keyup', (e)=>{
          if(e.keyCode == 37){
              left = 0;
              this.speed = 2;
          } else if(e.keyCode == 39){
              right = 0;
              this.speed = 2;
          }
        });
        window.addEventListener('keypress', (e)=>{
            if(e.keyCode == 32){
              this.bulletsOut()
                if(bullets.length < 1){
                  bullets.push(new Bullet(this.x+this.width/2,this.y));
                }
            }
        });
        let dir = right-left;
        if(left && this.freePlace((this.x-this.width)-this.speed)){
            if(this.speed > 13){
              this.speed = 13;
            } else {
              this.speed += 1;
            }
            this.x += this.speed*dir;
        } else if(right && this.freePlace((this.x+this.width*2)+this.speed)){

            if(this.speed > 13){
              this.speed = 13;
            } else {
              this.speed += 1;
            }
            this.x += this.speed*dir;
        }
      }
    }
    
    class Invaider{
      constructor(x, y){
        this.canvas = document.querySelector('#canvas');
        this.c = this.canvas.getContext('2d');
        this.width = 65;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.dirX = 1;
        this.dirY = 0;
        this.death = false;
        this.img = new Image();
        this.img.src = "invaiders.gif";
        this.animate = 0;
      }
      move = () =>{
          this.invaiderDeath();
      }
      invaiderDeath = () =>{
        if(bullets.length > 0){
          for(let i=0;i<invaiders.length;i++){
            if(invGrid[i]){
              if(this.collision(bullets[0].x+bullets[0].width/2, bullets[0].y-2, invaiders[i])){
                invaiders[i].death = true;
                setTimeout(() => {
                  invGrid[i] = 0;
                }, 100);
                console.log(invGrid[i])
                // break;
              }
            }
          }
        }
      }
      collision(posX, posY, item){
        if (posX > item.x &&
            posX < item.x + item.width &&
            item.y + item.height > posY &&
            item.y < posY) {
          return true;
        } else {
          return false;
        }
      }
      show = () =>{
        this.animate++;
        if(this.animate < 15 && !this.death){
          this.c.drawImage(this.img, 0, 0, 140, 80, this.x, this.y, this.width, this.height);
        } else if(this.animate > 15 && !this.death){
          this.c.drawImage(this.img, 145, 0, 140, 80, this.x, this.y, this.width, this.height);
          if(this.animate >= 29){
            this.animate = 0;
          }
        } else if(this.death){
          this.c.drawImage(this.img, 347, 620, 120, 80, this.x, this.y, this.width, this.height);
        }
        
      }
    }

  let bg1 = new Background('#000'),
      p1 = new Player(400,530);
      let invGridNum = 0;
  for(eachRows = 0; eachRows<3; eachRows++){
    for(eachCols = 0; eachCols<9; eachCols++){
      if(invGrid[invGridNum]){
          invaiders.push(new Invaider(100+((70+10)*eachCols),40+(40*eachRows)));
      }
      invGridNum++;
    }
  }  


        updateAll = () =>{
          bg1.show();
          p1.show();
          p1.control();
          bullets.forEach((item) => {
            if(!item.death){
              item.show();
              item.move();
            }
          })
          for(i = 0;i<invGrid.length;i++){
            if(invGrid[i]){
              invaiders[i].show();
              invaiders[i].move();
            } else {
              invaiders[i] = 0;
              invaiders[i].death = true;
            }
          }
          for(i=0;i<invaiders.length;i++){
            invaiders[i].x += invaiders[i].dirX;
            if(invaiders[i].x+100 > p1.canvas.width ||
              invaiders[i].x < 30){
              invaiders.forEach((item) =>{
                  item.dirX *= -1;
                  item.y += 7;
              });
            }

          }
            
        };

setInterval(updateAll, 1000/30);




  
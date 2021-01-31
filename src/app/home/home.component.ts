import { Component, ElementRef, OnInit, ViewChild,QueryList, ViewChildren } from '@angular/core';
import {Movies} from './movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild ("prevItem") prevItem: ElementRef;
  @ViewChildren ("itemList") items: QueryList<ElementRef>;
  @ViewChildren ("prev") prevItems : QueryList<ElementRef>;
  @ViewChildren ("next") nextItems: QueryList<ElementRef>;
  @ViewChildren ("myMovieItems") myMovieItems: QueryList<ElementRef>;
  constructor() { }
  activeIndex = 0;
  image={
    src:'',
    list: 0
  };
  imgList = [{src:"../../assets/images/Img1.JPG",active: false},{src:"../../assets/images/Img2.JPG",active: false},{src:"../../assets/images/Img3.JPG",active:false},{src:"../../assets/images/Img4.JPG",active:false},{src:"../../assets/images/Img5.JPG",active:false}];
  ngOnInit() {
    this.image.src = this.imgList[0].src;
    this.imgList[0].active = true;
    //this.autoChangeImg();
  }

  ngAfterViewInit(){
    this.prevItems.toArray().forEach((prev)=>{
      prev.nativeElement.hidden = true;
    })
  }

  changeImg=(index)=>{
    if(index === this.imgList.length){
      index = 0;
    } else if( index < 0){
      index = this.imgList.length-1;
    }
    console.log(index);
    this.image.list = this.activeIndex = index;
    this.image.src = this.imgList[index].src;
    this.imgList[index].active = true;
  }

  autoChangeImg=()=>{
    var me=this;
    setInterval(function(){
      if(me.image.list+1 === me.imgList.length){
        me.changeImg(0);
      } else {
        me.changeImg(me.image.list+1);
      }
    },2000);
  }

  scrollImg(direction, index){
    let arr = this.items.toArray(),
        prev = this.prevItems.toArray();
    let ele = arr[index-1].nativeElement;
    direction === 'Left' ?
      ele.scrollLeft -= window.innerWidth
      :
      ele.scrollLeft += window.innerWidth
    if(ele.scrollLeft <= 0) {
      prev[index-1].nativeElement.hidden = true ;
    } else {
      prev[index-1].nativeElement.hidden = false ;
    }
  }

  itemListScroll(event){
    let ele = this.items.toArray()[0];
    let prev = this.prevItems.toArray();
    let next = this.nextItems.toArray();
    if(ele.nativeElement.scrollLeft > 50){
      prev[0].nativeElement.hidden = false ;
    } else if(ele.nativeElement.scrollLeft <= 0){
      prev[0].nativeElement.hidden = true ;
    }
    if(ele.nativeElement.scrollWidth - ele.nativeElement.offsetWidth - 1 <= ele.nativeElement.scrollLeft){
      next[0].nativeElement.hidden = true ;
    } else {
      next[0].nativeElement.hidden = false ;
    }
  }

  onMouseOver(event, index){
    console.log(index);
  }

  onfocus(event, index){
    if(index === 1){
      let list = this.myMovieItems.toArray();
      console.log(list[0]);
    debugger;
    }
  }
  
  onblur(event, index){
    if(index === 1){
      let prev = this.prevItems.toArray();
      prev[index-1].nativeElement.hidden = false ;
    }
    console.log("blur");
  }

}

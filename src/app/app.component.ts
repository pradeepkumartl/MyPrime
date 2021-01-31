import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("input") input: ElementRef<HTMLElement>
  title = 'MyPrime';
  showCategoryPopup:boolean = false;
  showSearchBar:boolean = false;

  showCategory(event, value){
    value? this.showCategoryPopup = value : this.showCategoryPopup = !this.showCategoryPopup;
  }
  showSearchBarFn(event, value){
    this.showSearchBar = value;
    if(value){
      this.input.nativeElement.focus();
    }
  }

}

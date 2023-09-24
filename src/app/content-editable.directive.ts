import { Directive, ElementRef, EventEmitter, Host, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[content-editable]'
})
export class ContentEditableDirective {
  @HostListener('input') onChange() {
    this.onInputChange.emit(this.el.nativeElement.textContent);
  }

  @Output() onInputChange = new EventEmitter();
  constructor(public el: ElementRef, renderer: Renderer2) { 
    el.nativeElement.contentEditable="plaintext-only";
  }
}

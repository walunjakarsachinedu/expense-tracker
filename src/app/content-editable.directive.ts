import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[content-editable]'
})
export class ContentEditableDirective {
  @Input() type: "number"|"string" = "string";
  @Output() onInputChange = new EventEmitter();

  constructor(public el: ElementRef, renderer: Renderer2) { 
    el.nativeElement.contentEditable="plaintext-only";
  }
  
  @HostListener('input') onChange() {
    if(this.type == "number") this.removeNonDigitCharacter(this.el.nativeElement);
    this.onInputChange.emit(this.el.nativeElement.textContent);
  }

  private removeNonDigitCharacter(inputElement: any) {
    const numericValue = inputElement.textContent.replace(/[^0-9]/g, '');
    if(!/[^0-9]/g.test(inputElement.textContent)) return;
    const cursorPosition = this.getSelectionStart(inputElement);
    this.el.nativeElement.textContent = numericValue;
    if(inputElement.textContent != "") this.setSelectionRange(inputElement, cursorPosition, cursorPosition);
  }

  private getSelectionStart(inputElement: HTMLDivElement): number {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        return range.startOffset-1;
      }
    }
    return 0;
  }

  private setSelectionRange(inputElement: any, start: number, end: number): void {
    if (inputElement.setSelectionRange) {
      inputElement.setSelectionRange(start, end);
    } else if (window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(inputElement);
      range.collapse(true);
      range.setStart(inputElement.firstChild, start);
      range.setEnd(inputElement.firstChild, end);

      const selection = window.getSelection();
      if(selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
}

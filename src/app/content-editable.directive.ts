import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[content-editable]'
})
export class ContentEditableDirective {
  @Input() type: "number"|"string" = "string";
  @Input() input?: any;
  @Output() inputChange = new EventEmitter<any>();
  @Input() placeholder?: string;

  constructor(public el: ElementRef, renderer: Renderer2) { 
    el.nativeElement.contentEditable="plaintext-only";
    el.nativeElement.placeholder=this.placeholder;
  }


  @HostListener('input') onChange() {
    if(this.type == "number") this.removeNonDigitCharacter(this.el.nativeElement);
    this.setInput(this.el.nativeElement);
  }

  ngOnInit() {
    this.el.nativeElement.textContent = this.input ?? '';
  }

  private setInput(inputElement: any) {
    if(inputElement.textContent == "") return;
    const cursorPosition = this.getSelectionStart(inputElement, 0);
    this.input = (this.type=="number") ? parseInt(inputElement.textContent) : inputElement.textContent;
    if(inputElement.textContent == '' && this.type=="number") this.input = undefined;
    this.inputChange.emit(this.input);
    this.setSelectionRange(inputElement, cursorPosition, cursorPosition);
  }

  private removeNonDigitCharacter(inputElement: any) {
    if(inputElement.textContent == "") return;
    const numericValue = inputElement.textContent.replace(/[^0-9]/g, '');
    if(!/[^0-9]/g.test(inputElement.textContent)) return;
    const cursorPosition = this.getSelectionStart(inputElement);
    this.el.nativeElement.textContent = numericValue;
    this.setSelectionRange(inputElement, cursorPosition, cursorPosition);
  }

  private getSelectionStart(inputElement: HTMLDivElement, offset = 1): number {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        return range.startOffset-offset;
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

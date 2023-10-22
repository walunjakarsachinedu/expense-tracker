import { Directive, HostListener, Input, ViewContainerRef, Renderer2 } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuItem } from 'src/model/types';

@Directive({
  selector: '[contextMenuDir]'
})
export class ContextMenuDirective {
  @Input('items') contextMenuItems: ContextMenuItem[] = [];
  private overlay!: HTMLElement;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) { }




  @HostListener('click', ['$event'])
  openContextMenu(event: MouseEvent) {
    event.stopPropagation();

    // Get the position of the clicked element
    const targetElement = event.target as HTMLElement;
    const elementRect = targetElement.getBoundingClientRect();
    const left = elementRect.left- 3;
    const bottom = elementRect.top + elementRect.height;

    const contextMenuRef = this.viewContainerRef.createComponent(ContextMenuComponent);

    // Pass items to component
    contextMenuRef.instance.items = this.contextMenuItems;

    // Position component below parent element
    contextMenuRef.location.nativeElement.style.position = "fixed";
    contextMenuRef.location.nativeElement.style.left =  `${left}px`;
    contextMenuRef.location.nativeElement.style.top = `${bottom}px`;
    contextMenuRef.location.nativeElement.style["z-index"] = "3";
    contextMenuRef.location.nativeElement.style["user-select"] = "none";

    // Storing context menu reference to check if context menu is opened or not
    (window as any).contextMenuRef = contextMenuRef;

    this.createOverlay();

    // Disable all scrolling
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    
    document.addEventListener("click", this.closeContextMenu.bind(this));
    window.addEventListener("resize", this.closeContextMenu.bind(this));
  }


  private closeContextMenu() {
    (window as any).contextMenuRef = null;
    this.hideOverlay();
    this.viewContainerRef.clear();
    this.renderer.removeStyle(document.body, 'overflow');
    document.removeEventListener("click", this.closeContextMenu.bind(this));
    window.removeEventListener("resize", this.closeContextMenu.bind(this));
  }


  // Create overlay for other event to disable when context menu is opened
  createOverlay() {
    this.overlay = this.renderer.createElement('div');
    this.renderer.setStyle(this.overlay, 'position', 'fixed');
    this.renderer.setStyle(this.overlay, 'top', '0');
    this.renderer.setStyle(this.overlay, 'left', '0');
    this.renderer.setStyle(this.overlay, 'width', '100%');
    this.renderer.setStyle(this.overlay, 'height', '100%');
    this.renderer.setStyle(this.overlay, 'z-index', '1');
    this.renderer.setStyle(this.overlay, 'background', 'rgba(0, 0, 0, 0)');
    this.renderer.appendChild(document.body, this.overlay);

    this.renderer.listen(this.overlay, 'click', (event) => {
      this.closeContextMenu();
    });
  }
  private hideOverlay() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }

}

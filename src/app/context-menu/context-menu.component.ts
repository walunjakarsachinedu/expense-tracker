import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ContextMenuItem, Position } from 'src/model/types';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input() items: ContextMenuItem[] = [
    { 
      icon: "fa fa-clone", 
      name: "Copy", 
      onTap: () => { console.log("=> Copy item pressed") }, 
    },
    { 
      icon: "fa fa-trash", 
      name: "Delete", 
      onTap: () => { console.log("=> Delete item pressed") }, 
    }
  ];
  isVisible = false;
  
}

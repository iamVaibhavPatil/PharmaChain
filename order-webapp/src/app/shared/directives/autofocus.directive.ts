import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(public elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    (this.elementRef.nativeElement as any).focus.apply(this.elementRef.nativeElement);
  }
}

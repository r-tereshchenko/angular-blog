import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-focus]'
})

export class InputFocusDirective implements AfterViewInit {
  @Input('app-focus') input

  constructor(
    private el: ElementRef,
    public r: Renderer2
  ) {
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.value) {
      this.r.addClass(this.el.nativeElement, 'no-border')
      this.r.addClass(this.input.container, 'on-focus')
      this.r.addClass(this.input.border, 'show')
      this.r.addClass(this.input.label, 'focused')
    }
  }


  @HostListener('focus') onFocus(): void {
    this.r.addClass(this.el.nativeElement, 'no-border')
    this.r.addClass(this.input.container, 'on-focus')
    this.r.addClass(this.input.border, 'show')
    this.r.addClass(this.input.label, 'focused')
  }

  @HostListener('blur') onBlur(): void {
    if (!this.el.nativeElement.value.length) {
      this.r.removeClass(this.el.nativeElement, 'no-border')
      this.r.removeClass(this.input.container, 'on-focus')
      this.r.removeClass(this.input.border, 'show')
      this.r.removeClass(this.input.label, 'focused')
    }
  }
}

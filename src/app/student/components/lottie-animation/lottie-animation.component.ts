import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  styleUrl: './lottie-animation.component.css'
})
export class LottieAnimationComponent implements OnInit {
  @Input() animationPath: string;
  @Input() width: string = '300px'; // Default width
  @Input() height: string = '300px'; // Default height
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.loadLottieAnimation();
  }

  loadLottieAnimation() {
    const script = this.renderer.createElement('script');
    script.src = this.animationPath;
    script.onload = () => {
      const lottieContainer = this.el.nativeElement.querySelector('#lottieContainer');
      const animation = this.renderer.createElement('div');
      animation.id = 'lottieAnimation';
      lottieContainer.appendChild(animation);

      const animationOptions = {
        container: animation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: this.animationPath
      };

      (window as any).lottie.loadAnimation(animationOptions);
      animation.style.width = this.width;
      animation.style.height = this.height;

    };

    this.renderer.appendChild(document.body, script);
  }
}

import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    //selector: 'a[contar-clicks]' // hacer que solo funcion en la tag <a>
    selector: 'li[contar-clicks]'
})

export class ContarClicksDirective {
    clickN = 0;
    @HostBinding('style.opacity') opactiy:number = .1;
    @HostListener('click', ['$event.target']) onClick(btn){
        console.log('li', btn, "Números de clicks:", this.clickN++);
        this.opactiy += .1;
    };
}

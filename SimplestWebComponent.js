class SimplestWebComponent extends HTMLElement {
    constructor() {
        super();
        this.version='13-07-2022';

        /*
        Agregar event listeners desde métodos del tipo onEvent:
        Al llamar a super() desde la clase heredada, se escanean todos los métodos
        en búsqueda de event listeners del tipo onEvent y se agregan por defecto
        listeners para ellos; por ejemplo, si está declarado dentro de la clase
        un método con el nombre onClick, automáticamente se generará
        this.addEventListener('click', onCick)
        */
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((name) => {
            if(/^on[A-Z]/gm.test(name)){
                var lName=name.toLowerCase() ;
                if(lName in window){
                    this.addEventListener(lName.slice(2),this[name])
                }
            }
        });

        //Se crea por simplicidad la propiedad ‘dom’ como referencia al shadow dom
        this.dom = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        //Se pasan todos los atributos tipo ‘dataset’ a propiedades del objeto
        Object.entries(this.dataset).forEach(entry => {
            const [key, value] = entry;
            this[key]=value;
        });

        this.onCreate();
    }

    //Evento opcional que se ejecuta cuando es instanciada el elemento en el documento
    onCreate(atts=null){
        /*
        Siempre llamar desde las clases heredadas a super().onCreate()

        Tiene como argumento opcional un objeto con claves en lowerCameLCase
        y valores que serán asignados como propiedades miembro del elemento.

        Este método es llamado automáticamente cuando el elemento es declarado
        en tags del documento HTML
            Si se define un elemento en el documento como:
                <bar data-foo='123'></bar>
            en el evento onCreate.super dicho objeto dispondrá ya de una propiedad
            'this.foo' y tendrá como valor '123'
        */

        //Se pasan todas las propiedades pasadas en 'atts' a propiedades del objeto
        if(atts!==null){
            Object.entries(atts).forEach(entry => {
              const [key, value] = entry;
              this[key]=value;
            });
        }
    }

    disconnectedCallback() {
        //Remover todos los event listeners
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((name) => {
            if(/^on[A-Z]/gm.test(name)){
                var lName=name.toLowerCase() ;
                if(lName in window){
                    this.removeEventListener(lName.slice(2),this[name])
                }
            }
        });

        this.onRemove()
    }

    //Evento opcional que se ejecuta cuando es removido el elemento del documento
    onRemove(){}

    $(selector){return this.shadowRoot.querySelector(selector);}
    $All(selector){return this.shadowRoot.querySelectorAll(selector);}

}
customElements.define('simplest-web-component', SimplestWebComponent);

# SimplestWebComponent
_SimplestWebComponent_ es una clase extensible de JavaScript extremadamente liviana para definir Web Components de forma coherente y simplificada.

# ​Características

## Liviana

Un archivo de menos de 2KB sin minificación.

## Diseño OOP Coherente

Enfocada en brindar una estructura coherente al programador que le permita diseñar objetos de forma comprensible y fluida; _SimplestWebComponent_ se enfoca en crear gestionar objetos desde sus propiedades, respuesta a eventos y métodos.

Una estructura típica:

```javascript
customElements.define('custom-element', class extends SimplestWebComponent{
    constructor(){
        //Siempre llamar super();
        super();

        //Definir estilos y árbol DOM que componen el elemento
        this.dom.innerHTML=`<style>
                …
            </style>
            <div class="custom-element">
                …
            </div>`;
    }

    //Evento opcional que se ejecuta cuando es instanciado el elemento en el documento
    onCreate(atts=null){
        //Siempre llamar super().onCreate
        super.onCreate(atts);
        //Hacer uso de las propiedades del elemento, métodos y eventos; usualmente asignar contenidos pasados a través de atributos, pero ya convertidos a propiedades
        this.$(‘span.message’).innerText=this.message;
        …
    }

    //Evento opcional que se ejecuta cuando el elemento es removido del documento
    onRemove(){
       //Siempre llamar super.onRemove() para eliminar los event listeners declarados
       super.onRemove();
        //Realizar acciones  
        …
    }

    //getters y setters
    get propertyNanme(){
        …
    }
    set propertyName(value){
        …
    }

    //declarar eventos estándar HTML
    onClick(e){
        …
    }

    //métodos específicos del elemento
    myEvent(bar){
        …
    }
});
```

## Simplificación

El método de construcción(_constructor_), los eventos de instanciación(_onCreate_) y remoción(_onRemove_) en y del árbol DOM, simplifican de forma lógica la definición de las clases permitiéndole al programador enfocarse directamente en una estructura de diseño OOP.

## Eventos HTML estándar

_SimplestWebComponent_ también simplifica cualquier evento HTML estándar declarándolos dentro de la clase con solo nombrarlos en _lowerCamelCase_ con el prefijo &#39;_on_&#39; seguido del nombre del evento.

## Propiedades vs Atributos

_SimplestWebComponent_ parte de la idea de que si un programador considera necesario definir elementos web personalizados es porque los procesos de lógica en el documento aumentarán, desde allí se aborda una perspectiva de diseño de programación enfocada en hacer uso de propiedades/miembros del objeto JavaScript y no en atributos del nodo HTML; es así como la clase base en _connectedCallback_ pasa los valores de los atributos a propiedades del objeto para evitar el doble contexto de asignaciones(propiedades/atributos) y la complejidad de la asignación y retorno de atributos.

# ​Descripción de la clase

La clase suma a las propiedades y métodos implementadas en _Web Components:_

## Propiedades miembro

| **Propiedad** | **Tipo** | **Descripción** |
| --- | --- | --- |
| version | string | Retorna la versión implementada de la clase declarada en forma de fecha. |
| dom | shadow DOM | Raíz del árbol DOM que en encapsula y aísla los elementos hijos del componente. |

## Eventos personalizados

| **Evento** | **Argumentos** | **Descripción** |
| --- | --- | --- |
| onCreate | Atts (JavaScript Object) | Evento que se ejecuta cuando un elemento es instanciado; tiene como argumento un objeto con las claves y valores que son insertados como propiedades miembro al elemento; los nombres de las claves se especifican en formato _lowerCamelCase_ |
| onRemove | | Evento que se ejecuta cuando un elemento es removido del documento; se debe tener en cuenta que cuando se ejecuta este evento el elemento ya ha sido removido y cualquier gestión sobre la referencia &#39;_this_&#39; puede llevar a un error o no ejecutarse. |

## Métodos

| **Método** | **Argumentos** | **Descripción** |
| --- | --- | --- |
| $ | selector | Forma abreviada de _querySelector_ haciendo uso de _this.shadowRoot_ |
| $All | selector | Forma abreviada de _querySelectorAll_ haciendo uso de _this.shadowRoot_ |

# ​Licencia 
[Attribution 4.0 International CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

# ​Tutorial

La mejor forma de comprender la simplicidad y coherencia en el uso de SimplestWebComponent es descargando el archivo .zip y explorando y leyendo detalladamente los comentarios de la [clase base](/SimplestWebComponent.js), el [index.html](/index.html) y [test.js](/test.js).


customElements.define('message-box', class extends SimplestWebComponent{
    constructor(){
        //Siempre llamar a super();
        super();
        // Definir estilos y árbol DOM que componen el elemento
        this.dom.innerHTML=`<style>
            div{
                background-color: white;
                user-select: none;
                font-size:0.8em;
                margin:0.5em 0;
                box-shadow:0 0 12px rgb(0 0 0 / 10%), 0 0 4px rgb(0 0 0 / 30%);
                cursor:pointer;
                border:1px solid white;
            }

            span.icon{
                color: white;
                display: inline-block;
                width: 2em;
                text-align: center;
                padding: 0.4em 0;
                font-weight: bold;
            }
                div.message-info>span.icon{background-color:#e2e200;}
                div.message-success>span.icon{background-color:green;}
                div.message-warning>span.icon{background-color:orange;}
                div.message-error>span.icon{background-color:red;}

            span.message{
                padding:0.4em;
            }

            span.detailed-message{
                display:none;
                padding: 0.4em;
                margin-left: 2em;
                background-color: antiquewhite;
            }
            </style>

            <div class="message-info">
                <span class="icon">!</span>
                <span class="message">A message</span>
            </div>`;
    }

    onCreate(atts=null){
        //Siempre llamar super().onCreate()
        super.onCreate(atts);

        this.parentCounter(this.parentNode)
    }

    onRemove(){
        //llamar siempre super.onremove() para que sean elminados los event listeners registrados
        super.onRemove();
        this.parentCounter(this.parent)
    }

    get messageType(){return this.getAttribute('message-type')??'message-info';}
    set messageType(value){
        this.setAttribute('message-type',value);

        this.$('div').className=value;

        switch(value){
            case 'message-info':this.icon='!';break;
            case 'message-success':this.icon='K';break;
            case 'message-warning':this.icon='?';break;
            case 'message-error':this.icon='E';break;
        }
    }

    get icon(){return this.$('.icon').innerHTML}
    set icon(value){this.$('.icon').innerHTML=value;}

    get message(){return this.$('.message').innerHTML}
    set message(value){this.$('.message').innerHTML=value;}

    //definición de eventos estandar de HTML
    onClick(e){
        this.parent=this.parentNode;
        this.remove();
    }

    //métodos especificos del elemento
    parentCounter(parent){
        parent.firstElementChild.innerHTML='<b>Message boxes number:</b> '+parent.querySelectorAll('message-box').length;
    }
});

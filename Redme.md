decodificar-uri-componente
CI Estado de cobertura

Un mejor decodeURIComponent

¿Por qué?
Convierte la lista de materiales en un carácter de reemplazo � .
No arroja con entrada codificada no válida.
Decodifica tanto de la cadena como sea posible.
Instalar
$ npm install --save decode-uri-component
Uso
import decodeUriComponent from 'decode-uri-component';

decodeUriComponent('%25');
//=> '%'

decodeUriComponent('%');
//=> '%'

decodeUriComponent('st%C3%A5le');
//=> 'ståle'

decodeUriComponent('%st%C3%A5le%');
//=> '%ståle%'

decodeUriComponent('%%7Bst%C3%A5le%7D%');
//=> '%{ståle}%'

decodeUriComponent('%7B%ab%%7C%de%%7D');
//=> '{%ab%|%de%}'

decodeUriComponent('%FE%FF');
//=> '\uFFFD\uFFFD'

decodeUriComponent('%C2');
//=> '\uFFFD'

decodeUriComponent('%C2%B5');
//=> 'µ'
API
decodeUriComponent(encodedURI)
codificadoURI
Escribe:string

Un componente codificado de un Identificador Uniforme de Recursos.

Licencia
MIT © Sam Verschueren

Obtenga soporte profesional para este paquete con una suscripción a
Tidelift Tidelift ayuda a que el código abierto sea sostenible para los mantenedores al tiempo que brinda a las empresas
garantías sobre seguridad, mantenimiento y licencias para sus dependencias.

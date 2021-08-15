<h1>Cómo agregar bordes y leyendas a los códigos QR</h1>

--- Abstract / Meta description ---

Aprenda a agregar bordes y leyendas que hagan que su código QR sea único. Diseñe su código QR con una llamada a la acción pegadiza para impulsar la conversión.

--- Short content 1 ---

Aprenda a agregar frases pegadizas con subtítulos de códigos QR. Elija entre plantillas predefinidas o cree la suya propia con una cuenta PRO.

----------

<p>Para los especialistas en marketing, todo se reduce a la conversión. Si tiene un anuncio brillante diseñado,
    nada importa si la audiencia no se comunica de una forma u otra.</p>

<p><a href="#static:url">Los códigos QR</a> son una herramienta de marketing útil, pero agregar un código QR de formato simple no sirve
    justicia a los trabajos creativos realizados en los materiales de marketing.</p>

<p>Sin un pequeño empujón, la audiencia puede omitir el código QR, incluso cuando está a la vista.
    A menudo, un llamado a la acción (CTA) y una presentación única son lo que se necesita para que los usuarios escaneen el código QR.</p>

<h2>¿Por qué agregar bordes y leyendas a los códigos QR?</h2>

<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 1 - templates.png" alt="Plantillas de código QR - ScanMeFindMe"></p>

<p>En lugar de seguir con el formato predeterminado, querrá agregar un texto "Escanearme" junto con el código QR.
    Es posible que las personas hayan desarrollado una 'ceguera por los códigos QR' al ver a tantos de ellos en su vida diaria.</p>

<p>Sin embargo, un texto "Escanearme" y un borde único llaman su atención sobre el código QR.
    El CTA no deja dudas sobre lo que debe hacer la audiencia a continuación: escanear el código QR.</p>

<p>También puede agregar texto que muestre una vista previa de lo que está al otro lado del código QR.
    Por ejemplo, un texto de la App Store les dice a los usuarios que están a punto de ser redirigidos a su aplicación en
    Tienda de aplicaciones de Apple. O un simple "Menú" para que los usuarios vean lo que ofrece su restaurante.</p>

<p>La idea es que querrás infundir confianza y eliminar cualquier incertidumbre con los códigos QR.
    A los clientes les gusta tener una idea de en qué se están metiendo antes de escanear el QR.
    Con los bordes y los subtítulos adecuados, puede hacer precisamente eso y aumentar las conversiones.</p>

<p>Incluso en la <a href="#static:url">versión gratuita del generador de códigos QR</a> puedes modificar los subtítulos
    en las plantillas. Cambie el <strong>"Escanearme"</strong> predeterminado a <strong>"Más información"</strong>,
    <strong>"Nuestro menú"</strong>, su identificador de Instagram o un número de teléfono. Si su texto es demasiado largo o demasiado corto,
    puede reducir o aumentar el tamaño de la fuente para que se vea mejor.</p>

<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 2 - qr code instagram.png" alt="código QR para el identificador de instagram - ScanMeFindMe"></p>

<p>Personalizar sus códigos QR con plantillas no solo ayuda con el marketing, sino que también evita confusiones.
    cuando los está ordenando. Imagínese cuando está a punto de imprimir docenas de códigos QR en diferentes materiales,
    y deberá escanearlos para verificarlos manualmente. Al tener leyendas y bordes,
    sabrá para qué están destinados solo por su apariencia visual.</p>
<h2>Cómo crear sus propias plantillas</h2>
<p>Cuando utiliza <a href="#pro">ScanMeFindMe PRO</a>, tiene acceso a un conjunto de plantillas prediseñadas.
    Sin embargo, también puede diseñar sus propias plantillas, cargarlas y personalizarlas.
    el <a href="#static:url">código QR generado en nuestra plataforma</a>.</p>

<p>No solo eso, también puede <a href="#article:about_presets">crear ajustes preestablecidos</a> que incluyan su elección de plantillas para ahorrar tiempo en el futuro.</p>

<p>Ahora, ¿cómo crea sus propias plantillas?</p>

<p>Las plantillas son archivos de imagen en formato SVG. Una imagen SVG es un archivo XML que contiene etiquetas que representan diferentes elementos.
    Los navegadores web utilizan la información del archivo para representar la imagen en cualquier resolución.
    Puede crear un archivo SVG a través de un software de diseño gráfico como Adobe Illustrator o utilizar un convertidor de JPEG / PNG a SVG.</p>

<p>La forma más rápida de crear una plantilla es duplicar una de la biblioteca y editar la fuente SVG.</p>
<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 3 - edit svg template.png" alt="Editando plantilla de código QR - ScanMeFindMe"></p>

<p>Para que una plantilla funcione en ScanMeFindMe, debe tener un elemento <strong>&lt;rect&gt;</strong> con <strong>id="qr"</strong>, que se sustituirá por el código QR cuando se genera.</p>
<p>También puedes incluir elementos <strong>&lt;text&gt;</strong>, si esos elementos tienen un atributo <strong>id</strong>, se convertirán en subtítulos que podrás modificar para cada código QR que use este modelo. Además, si dicho &lt;text&gt; elementos
contienen el atributo <strong>tamaño de fuente</strong>, podrá cambiar el tamaño de fuente para cada código QR utilizando la misma plantilla.
</p>

<p>¡Cuidado con algunas limitaciones! ScanMeFindMe utiliza la biblioteca <a href="https://cairosvg.org/" class="smfm-externallink">CairoSVG</a> para convertir
    códigos QR generados a PNG, PDF y formatos PS.
Es posible que algunos elementos SVG complicados no se conviertan correctamente. Por razones de seguridad, la directiva @include se ignora durante
conversión, por lo que no puede incluir ninguna URL externa (con la excepción de las fuentes que instalamos en nuestro servidor).</p>

<h2>¿Qué fuentes son compatibles?</h2>

<p>En lugar de entrar en una interminable discusión entre serif y san serif, le permitimos decidir qué es lo mejor con varias fuentes de uso común.
     Puede encontrar las fuentes que están preinstaladas en el servidor en nuestro repositorio de Github:
     <a href="https://github.com/ScanMeFindMe/fonts" class="smfm-externallink" target="_blank">https://github.com/ScanMeFindMe/fonts</a></p>

<p>Si cree que nos estamos perdiendo una fuente interesante para otros especialistas en marketing, puede enviar una solicitud de extracción.
     Generalmente, preferimos fuentes que admitan varios idiomas.</p>

<p>Empiece a cargar sus propias plantillas con una <a href="#pro">cuenta ScanMeFindMe PRO</a> ahora.</p>
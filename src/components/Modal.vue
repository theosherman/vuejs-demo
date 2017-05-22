<template lang="pug">
div
  h1 Modal
  hr
  button.btn.btn-primary(data-toggle="modal", data-target="#myModal") Launch Modal

  #myModal.modal.fade(tabindex="-1", role="dialog", aria-labelledby="myModalLabel")
    .modal-dialog(role="document")
      .modal-content
        
        .modal-header
          button.close(data-dismiss="modal")
            span &times;
          h4.modal-title Modal title

        .modal-body
          p Hello world!

        .modal-footer
          button.btn.btn-default(data-dismiss="modal") Close
</template>

<script>
require('expose-loader?jQuery!jquery')
require('bootstrap')
</script>

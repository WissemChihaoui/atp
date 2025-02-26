'use strict';
$(function () {
    const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

const dropzoneBasic = document.querySelector('#add-company-logo');
  if (dropzoneBasic) {
    const myDropzone = new Dropzone(dropzoneBasic, {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: '.jpg,.jpeg,.png,.gif',
      addRemoveLinks: true,
      maxFiles: 1
    });
  }


  const date = new Date();
  const companyDate = document.querySelector('#add-company-date');

  if (companyDate) {
    companyDate.flatpickr({
      monthSelectorType: 'static',
      defaultDate: date
    });
  }
})

$(function () {
    // Select2
    var select2 = $('.select2');
    if (select2.length) {
      select2.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>').select2({
          dropdownParent: $this.parent(),
          placeholder: $this.data('placeholder') // for dynamic placeholder
        });
      });
    }
});
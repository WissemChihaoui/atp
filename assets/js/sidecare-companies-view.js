"use strict";
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


const dropzoneBasic = document.querySelector('#view-logo-company'),
      companyDocumentDropzone = document.querySelector('#company-document-dropzone');

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
  if (companyDocumentDropzone) {
    const myDropzone = new Dropzone(companyDocumentDropzone, {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: '.jpg,.jpeg,.png,.gif',
      addRemoveLinks: true,
      maxFiles: 1
    });
  }

  var dt_admins_table = $('.datatables-admins'),
      select2 = $(".select2"),
      adminView = "#";

      if (select2.length) {
        select2.each(function () {
          var $this = $(this);
          $this.wrap("<div class='position-relative'></div>").select2({
            placeholder: "",
            dropdownParent: $this.parent(),
          });
        });
      }
      select2.each(function () {
        var $this = $(this);
        $this.wrap("<div class='position-relative'></div>").select2({
          placeholder: "",
          dropdownParent: $this.parent(),
        });
      });

  if(dt_admins_table) {
    var dt_admins = dt_admins_table.DataTable({
      ajax: assetsPath + 'json/sidecare-admins-company.json',
      columns: [
        { data: "" },
        { data: "firstName" },
        { data: "permession" },
        { data: "fonction" },
        { data: "email" },
        { data: "" },

      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          targets: 2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $fName = full["firstName"],
                $lName = full["lastName"],
                $image = full['logo'];

                if ($image) {
                  // For Avatar image
                  var $output =
                    '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
                } else {
                  // For Avatar badge
                  var stateNum = Math.floor(Math.random() * 6);
                  var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
                  var $state = states[stateNum],
                    $name = full['firstName']+" "+full['lastName'],
                    $initials = $name.match(/\b\w/g) || [];
                  $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                  $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
                }
  
              // Creates full output for row
              var $row_output =
                '<div class="d-flex justify-content-start align-items-center customer-name">' +
                '<div class="avatar-wrapper">' +
                '<div class="avatar me-2">' +
                $output +
                '</div>' +
                '</div>' +
                '<div class="d-flex flex-column">' +
                '<a href="' +
                adminView +
                '" ><span class="fw-medium">' +
                $fName +" "+$lName
                "</span></a>" +
                
                "</div>" +
                "</div>";
              return $row_output;
          }
        },
        {
          targets: 3,
          render: function (data, type, full, meta) {
            return full['permession']
          }
        },
        {
          targets: 4,
          render: function (data, type, full, meta) {
            return full['fonction']
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta){
            return full['email']
          }
        },
        {
          // Actions
          targets: 6,
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-sm-center justify-content-sm-center">' +
              '<button class="btn btn-sm btn-icon delete-record me-2"><i class="ti ti-trash"></i></button>' +
              "</div>"
            );
          },
        },

      ],
      order: [[2, "desc"]],
      dom:
        '<"card-header d-flex flex-wrap pb-md-2"' +
        '<"d-flex align-items-center me-5"f>' +
        '<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end gap-3 gap-sm-0 flex-wrap flex-sm-nowrap"lB>' +
        ">t" +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        ">",
      language: {
        sLengthMenu: "Afficher _MENU_ entrées",
        search: "",
        searchPlaceholder: "Rechercher Entreprise",
        info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
        infoEmpty: "Aucune entrée disponible",
        infoFiltered: "(filtré à partir de _MAX_ entrées au total)",
        loadingRecords: "Chargement en cours...",
        processing: "Traitement en cours...",
        zeroRecords: "Aucun enregistrement correspondant trouvé",
        emptyTable: "Aucune donnée disponible dans le tableau",
        paginate: {
          first: "Premier",
          last: "Dernier",
          next: "Suivant",
          previous: "Précédent",
        },
        aria: {
          sortAscending: ": activer pour trier la colonne par ordre croissant",
          sortDescending:
            ": activer pour trier la colonne par ordre décroissant",
        },
      },
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle me-3",
          text: '<i class="ti ti-download me-1"></i>Exporter',
          buttons: [
            {
              extend: "print",
              text: '<i class="ti ti-printer me-2" ></i>Imprimer',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css("color", headingColor)
                  .css("border-color", borderColor)
                  .css("background-color", bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="ti ti-file me-2" ></i>CSV',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="ti ti-file-export me-2"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="ti ti-file-text me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="ti ti-copy me-2" ></i>Copier',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="ti ti-plus me-0 me-sm-1 mb-1 ti-xs"></i><span class="d-none d-sm-inline-block">Affecter</span>',
          className: "add-new btn btn-primary py-2",
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addAdminCompanyModal'
          }
        },
      ],

      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Détails de " + data["name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    "<td>" +
                    col.title +
                    ":" +
                    "</td> " +
                    "<td>" +
                    col.data +
                    "</td>" +
                    "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
      
    });
    $(".dataTables_length").addClass("ms-n2 mt-0 mt-md-3 me-2");
    $(".dt-action-buttons").addClass("pt-0");
    $(".dataTables_filter").addClass("ms-n3");
    $(".dt-buttons").addClass("d-flex flex-wrap");
  }
  $(".datatables-admins tbody").on("click", ".delete-record", function () {
    let row = $(this).closest("tr");
    let rowData = dt_admins.row(row).data();
    console.log(rowData)
    Swal.fire({
      title: "Supprimer",
      text: "Êtes-vous sûr de vouloir supprimer "+rowData.firstName+" ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimer!",
      customClass: {
        confirmButton: "btn btn-primary me-3",
        cancelButton: "btn btn-label-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
        console.log(result);
        
      if (result.isConfirmed) {
        // Remove row from DataTable

        //SEND THE REQUEST 
        dt_admins.row(row).remove().draw();
        Swal.fire({
          icon: "success",
          title: "Supprimé!",
          text: "L'enregistrement a été supprimé.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  });

  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);

  // Tagify of users 
  const usersList = [
    {
      value: 1,
      name: 'Justinian Hattersley',
      avatar: 'https://i.pravatar.cc/80?img=1',
      email: 'jhattersley0@ucsd.edu'
    },
    {
      value: 2,
      name: 'Antons Esson',
      avatar: 'https://i.pravatar.cc/80?img=2',
      email: 'aesson1@ning.com'
    },
    {
      value: 3,
      name: 'Ardeen Batisse',
      avatar: 'https://i.pravatar.cc/80?img=3',
      email: 'abatisse2@nih.gov'
    },
    {
      value: 4,
      name: 'Graeme Yellowley',
      avatar: 'https://i.pravatar.cc/80?img=4',
      email: 'gyellowley3@behance.net'
    },
    {
      value: 5,
      name: 'Dido Wilford',
      avatar: 'https://i.pravatar.cc/80?img=5',
      email: 'dwilford4@jugem.jp'
    },
    {
      value: 6,
      name: 'Celesta Orwin',
      avatar: 'https://i.pravatar.cc/80?img=6',
      email: 'corwin5@meetup.com'
    },
    {
      value: 7,
      name: 'Sally Main',
      avatar: 'https://i.pravatar.cc/80?img=7',
      email: 'smain6@techcrunch.com'
    },
    {
      value: 8,
      name: 'Grethel Haysman',
      avatar: 'https://i.pravatar.cc/80?img=8',
      email: 'ghaysman7@mashable.com'
    },
    {
      value: 9,
      name: 'Marvin Mandrake',
      avatar: 'https://i.pravatar.cc/80?img=9',
      email: 'mmandrake8@sourceforge.net'
    },
    {
      value: 10,
      name: 'Corrie Tidey',
      avatar: 'https://i.pravatar.cc/80?img=10',
      email: 'ctidey9@youtube.com'
    }
  ];
  function tagTemplate(tagData) {
    return `
    <tag title="${tagData.title || tagData.email}"
      contenteditable='false'
      spellcheck='false'
      tabIndex="-1"
      class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ''}"
      ${this.getAttributes(tagData)}
    >
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.name}</span>
      </div>
    </tag>
  `;
  }

  function suggestionItemTemplate(tagData) {
    return `
    <div ${this.getAttributes(tagData)}
      class='tagify__dropdown__item align-items-center ${tagData.class ? tagData.class : ''}'
      tabindex="0"
      role="option"
    >
      ${
        tagData.avatar
          ? `<div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>`
          : ''
      }
      <div class="fw-medium">${tagData.name}</div>
      <span>${tagData.email}</span>
    </div>
  `;
  }

  function dropdownHeaderTemplate(suggestions) {
    return `
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length ? `Add remaning` : 'Add All'}</strong>
            <span>${suggestions.length} members</span>
        </div>
    `;
  }

  const TagifyAdmins = document.querySelector('#adminToAdd');

  let TagifyUserList = new Tagify(TagifyAdmins, {
    tagTextProp: 'name', // very important since a custom template is used with this property as text. allows typing a "value" or a "name" to match input with whitelist
    enforceWhitelist: true,
    skipInvalid: true, // do not remporarily add invalid tags
    dropdown: {
      closeOnSelect: false,
      enabled: 0,
      classname: 'users-list',
      searchKeys: ['name', 'email'] // very important to set by which keys to search for suggesttions when typing
    },
    templates: {
      tag: tagTemplate,
      dropdownItem: suggestionItemTemplate,
      dropdownHeader: dropdownHeaderTemplate
    },
    whitelist: usersList
  });

   // attach events listeners
   TagifyUserList.on('dropdown:select', onSelectSuggestion) // allows selecting all the suggested (whitelist) items
   .on('edit:start', onEditStart); // show custom text in the tag while in edit-mode

 function onSelectSuggestion(e) {
   // custom class from "dropdownHeaderTemplate"
   if (e.detail.elm.classList.contains(`${TagifyUserList.settings.classNames.dropdownItem}__addAll`))
     TagifyUserList.dropdown.selectAll();
 }

 function onEditStart({ detail: { tag, data } }) {
   TagifyUserList.setTagTextNode(tag, `${data.name} <${data.email}>`);
 }
})

// Effectifs

$(function () {
  var dt_effectifs_table = $('.datatables-effectifs'),
      select2 = $(".select2"),
     flatpickrDate = document.querySelector('#flatpickr-date'),
      adminView = "#";

      if (flatpickrDate) {
        flatpickrDate.flatpickr({
          monthSelectorType: 'static'
        });
      }

  if (dt_effectifs_table.length) {
    var dt_effectif = dt_effectifs_table.DataTable({
      ajax: assetsPath + "json/sidecare-effectifs-company.json",
      columns: [
        { data: "" },  // Control column
        { data: "name" },
        { data: "contract" },
        { data: "poste" },
        { data: "contractStart" },
        { data: "contractEnd" },
        { data: "" },  // Actions column (this is misplaced)
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          // spent
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['name'];

            return '<span >' + $name + '</span>';
          }
        },
        {
          // spent
          targets: 3,
          render: function (data, type, full, meta) {
            var $contract = full['contract'];

            return '<span >' + $contract + '</span>';
          }
        },
        {
          // spent
          targets: 4,
          render: function (data, type, full, meta) {
            var $poste = full['poste'];

            return '<span >' + $poste + '</span>';
          }
        },
        {
          // date
          targets: 5,
          render: function (data, type, full, meta) {
            var date = new Date(full.contractStart); // convert the date string to a Date object
            var formattedDate = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' });
            return '<span class="text-nowrap">' + formattedDate + '</span > ';
          }
        },
        {
          // date
          targets: 6,
          render: function (data, type, full, meta) {
            var date = new Date(full.contractEnd); // convert the date string to a Date object
            var formattedDate = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' });
            return '<span class="text-nowrap">' + formattedDate + '</span > ';
          }
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-sm-center justify-content-sm-center">' +
              '<button class="btn btn-sm btn-icon delete-record me-2"><i class="ti ti-trash"></i></button>' +
              '<a href="#" class="btn btn-sm btn-icon"><i class="ti ti-edit"></i></a>' +
              "</div>"
            );
          },
        },
      ],
      order: [[2, 'desc']],
      dom:
        '<"card-header d-flex flex-wrap pb-md-2"' +
        '<"d-flex align-items-center me-5"f>' +
        '<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end gap-3 gap-sm-0 flex-wrap flex-sm-nowrap"lB>' +
        ">t" +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        ">",
      lengthMenu: [6, 30, 50, 70, 100],
      language: {
        sLengthMenu: "Afficher _MENU_ entrées",
        search: "",
        searchPlaceholder: "Rechercher Entreprise",
        info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
        infoEmpty: "Aucune entrée disponible",
        infoFiltered: "(filtré à partir de _MAX_ entrées au total)",
        loadingRecords: "Chargement en cours...",
        processing: "Traitement en cours...",
        zeroRecords: "Aucun enregistrement correspondant trouvé",
        emptyTable: "Aucune donnée disponible dans le tableau",
        paginate: {
          first: "Premier",
          last: "Dernier",
          next: "Suivant",
          previous: "Précédent",
        },
        aria: {
          sortAscending: ": activer pour trier la colonne par ordre croissant",
          sortDescending:
            ": activer pour trier la colonne par ordre décroissant",
        },
      },
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle me-3",
          text: '<i class="ti ti-download me-1"></i>Exporter',
          buttons: [
            {
              extend: "print",
              text: '<i class="ti ti-printer me-2" ></i>Imprimer',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css("color", headingColor)
                  .css("border-color", borderColor)
                  .css("background-color", bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="ti ti-file me-2" ></i>CSV',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="ti ti-file-export me-2"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="ti ti-file-text me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="ti ti-copy me-2" ></i>Copier',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("customer-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="ti ti-plus me-0 me-sm-1 mb-1 ti-xs"></i><span class="d-none d-sm-inline-block">Ajouter</span>',
          className: "add-new btn btn-primary py-2",
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#addAdminCompanyModal'
          }
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }

   // Delete Record
   $('.datatables-effectifs tbody').on('click', '.delete-record', function () {
    dt_effectif.row($(this).parents('tr')).remove().draw();
  });

  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
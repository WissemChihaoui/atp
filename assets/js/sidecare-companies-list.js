"use strict";
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_companies_table = $(".datatables-companies"),
    select2 = $(".select2"),
    entrepriseView = "#";
  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: "United States ",
      dropdownParent: $this.parent(),
    });
  }

  const addCompany = 'add.html';

  if (dt_companies_table.length) {
    var dt_companies = dt_companies_table.DataTable({
      ajax: assetsPath + "json/sidecare-companies-data.json",
      columns: [
        { data: "" },
        { data: "id" },
        { data: "name" },
        { data: "date" },
        { data: "admin" },
        { data: "cabinet" },
        { data: "employes" },
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
          // name and siret
          targets: 2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full["name"],
              $email = full["siret"],
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
                  $name = full['name'],
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
              entrepriseView +
              '" ><span class="fw-medium">' +
              $name +
              "</span></a>" +
              '<small class="text-muted">' +
              $email +
              "</small>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
            // Date and Time
            targets: 3,
            render: function (data, type, full, meta) {
              var date = new Date(full.date); // convert the date string to a Date object
              var timeX = full['time'].substring(0, 5);
              var formattedDate = date.toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                time: 'numeric'
              });
              return '<span class="text-nowrap">' + formattedDate + ', ' + timeX + '</span>';
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
          text: '<i class="ti ti-plus me-0 me-sm-1 mb-1 ti-xs"></i><span class="d-none d-sm-inline-block">Ajouter</span>',
          className: "add-new btn btn-primary py-2",
          action: function () {
            window.location.href = addCompany;
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
  $(".datatables-companies tbody").on("click", ".delete-record", function () {
    let row = $(this).closest("tr");
    let rowData = dt_companies.row(row).data();
    console.log(rowData)
    Swal.fire({
      title: "Supprimer",
      text: "Êtes-vous sûr de vouloir supprimer "+rowData.name+" ?",
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
        dt_companies.row(row).remove().draw();
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
});

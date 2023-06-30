var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

$(document).ready(function () {
  $("#prompt").keydown(function (event) {
    var id = event.keyCode ? event.keyCode : event.which;
    if (id == ENTER_KEY) {
      $.ajax({
        type: "POST",
        data: {
          title: $("#prompt").val(),
          csrfmiddlewaretoken: $("meta[name=csrf-token]").attr("content")
        },
        url: "/todos/task.json"
      }).done(function (data) {
        $("#prompt").val("");
        traerTareas();
      }).fail(function (error) {
        console.log("Error:", error);
      });
    }
  });

  $("#all-link").click(function (e) {
    e.preventDefault();
    $(".filters a").removeClass("selected");
    $(this).addClass("selected");
    traerTareas();
  });

  $("#active-link").click(function (e) {
    e.preventDefault();
    $(".filters a").removeClass("selected");
    $(this).addClass("selected");
    filtrarTareas(false);
  });

  $("#completed-link").click(function (e) {
    e.preventDefault();
    $(".filters a").removeClass("selected");
    $(this).addClass("selected");
    filtrarTareas(true);
  });

  $("#clear-completed").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/todos/clear_completed.json",
      type: "POST",
      data: {
        csrfmiddlewaretoken: $("meta[name=csrf-token]").attr("content")
      },
      success: function (data) {
        traerTareas();
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      }
    });
  });

  function traerTareas() {
    $.get("/todos/task.json", function (data) {
      escribirTarea(data);
    }).fail(function () {
      console.log("Error: No se pudo obtener las tareas.");
    });
  }

  function filtrarTareas(completed) {
    $.get("/todos/task.json", function (data) {
      var filteredTasks = data.filter(function (task) {
        return task.completed === completed;
      });
      escribirTarea(filteredTasks);
    }).fail(function () {
      console.log("Error: No se pudo obtener las tareas.");
    });
  }

  function escribirTarea(tareas) {
    var _script = '{{#this}}' +
      '<li {{#if completed}}class="completed"{{/if}} data-id="{{id}}">' +
      '<div class="view">' +
      '<input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>' +
      '<label>{{title}}</label>' +
      '<button class="destroy"></button>' +
      '</div>' +
      '<input class="edit" value="{{title}}">' +
      '</li>' +
      '{{/this}}';

    var template = window.Handlebars.compile(_script);
    $(".todo-list").html(template(tareas));

    $(".toggle").click(function (event) {
      var $event = $(event.target);
      var task_id = $event.parent().parent();
      $.post("/todos/task/" + task_id.data("id") + "/toggle.json", {
        csrfmiddlewaretoken: $("meta[name=csrf-token]").attr("content")
      }, function (data) {
        traerTareas();
      }).fail(function (err) {
        console.log("Error al cambiar el estado de la tarea:", err);
      });
    });

    $(".todo-list label").dblclick(function (e) {
      var $input = $(e.target).closest("li").addClass("editing").find(".edit");
      var tmpStr = $input.val();
      $input.val("");
      $input.val(tmpStr);
      $input.focus();
    });

    $(".todo-list .edit").keyup(function (e) {
      if (e.which === ENTER_KEY) {
        e.target.blur();
      }

      if (e.which === ESCAPE_KEY) {
        $(e.target).data("abort", true).blur();
      }
    });

    $(".todo-list .edit").focusout(function (e) {
      var el = e.target;
      var $el = $(el);
      var val = $el.val().trim();

      if ($el.data("abort")) {
        $el.data("abort", false);
      } else if (!val) {
        eliminarTarea($el.parent().data("id"));
      } else {
        $.ajax({
          type: "POST",
          url: "/todos/task/" + $el.parent().data("id") + "/edit.json",
          data: {
            title: val,
            csrfmiddlewaretoken: $("meta[name=csrf-token]").attr("content")
          }
        }).done(function () {
          traerTareas();
        }).fail(function () {
          console.log("Error al editar la tarea.");
        });
      }
    });

    $(".todo-list .destroy").click(function (e) {
      var el = e.target;
      var $el = $(el).parent().parent();
      eliminarTarea($el.data("id"));
    });
  }

  function eliminarTarea(taskId) {
    $.ajax({
      type: "POST",
      url: "/todos/task/" + taskId + "/delete.json",
      data: {
        csrfmiddlewaretoken: $("meta[name=csrf-token]").attr("content")
      }
    }).done(function () {
      traerTareas();
    }).fail(function () {
      console.log("Error al eliminar la tarea.");
    });
  }

  traerTareas();
});

function insert1() {
    myJson = {
        id: $("#datatable").find("#nameid").val(),
        mame: $("#datatable").find("#name").val(),
        desctibrion: $("#datatable").find("#desctribrion").val(),
        price: $("#datatable").find("#price").val(),
    };

    console.log("myJson", myJson);
}
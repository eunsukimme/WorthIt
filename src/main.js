

$("document").ready( () => {

    $('#register-button').on('click', function() {

        let _name = $('#input-name').val();
        let _age = $('#input-number').val();
        let _address = $('#input-address').val();
        let _intro = $('#input-introduce').val();
        addUser(_name, _age, _address, _intro);

    });
    $('#userCountButton').on('click', function() {
        getUserCount().then(function(result) {
            $('#userCount').text(`user count: ${result}.`);
        })
    });
    $('#userDeleteButton').on('click', function() {
        deleteUser();
    })

});
/**
 * Created by mattchastain on 4/17/17.
 */
$(document).ready( () => {
    let formData;
    // marmottajax({
    //     url: `http://127.0.0.1:8000/get_docs/`,
    //     method: 'get',
    // }).success(function(result) {
    //     formData = JSON.parse(result);
    //     let i = 1;
    //     formData && formData.time_slots && formData.time_slots.length && formData.time_slots.forEach( (student) => {
    //         if ( student[`student${i}`]) {
    //             let currentStudent = $(`#student${i}`);
    //             currentStudent.attr('disabled', true);
    //             currentStudent.val(student[`student${i}`]);
    //         }
    //     });
    // }).error(function(message) {
    //     console.log(message);
    // });
    axios.get('http://127.0.0.1:8000/get_docs/')
    .then(function (response) {
        formData = response.data;
        console.log(formData);
        let i = 1;
        formData && formData.time_slots && formData.time_slots.length && formData.time_slots.forEach( (student) => {
            if ( student[`student${i}`]) {
                console.log( `student${i}`, student );
                let currentStudent = $(`#student${i}`);
                currentStudent.attr('disabled', true);
                currentStudent.val(student[`student${i}`]);
            }
            i++;
        });
    })
    .catch(function (error) {
        console.log(error);
    });

    $('#saveSignup').on('click', (e) => {
        $('input').each( (index, val) => {
            if ( $(val).val() ) {
                formData.time_slots.map( ( student ) => {
                   if (student.hasOwnProperty(val.id)) {
                       student.read_only = true;
                       student[val.id] = $(val).val()
                    }
                    return student
                });
            }
        });
        console.log(formData);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/post_docs/',
            data: JSON.stringify(formData && formData.time_slots)
        });
        // marmottajax({
        //     url: 'http://127.0.0.1:8000/post_docs/',
        //     method: "post",
        //     formData,
        // }).success(function(result) {
        //     // result
        // }).error(function(message) {
        //     // message
        // });
    });
});
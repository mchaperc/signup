/**
 * Created by mattchastain on 4/17/17.
 */
$(document).ready( () => {
    let formData;
    axios.get('https://salty-ravine-56464.herokuapp.com/get_docs/')
    .then(function (response) {
        formData = response.data;
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
        axios({
            method: 'post',
            url: 'https://salty-ravine-56464.herokuapp.com/post_docs/',
            data: JSON.stringify(formData && formData.time_slots)
        });
    });
});
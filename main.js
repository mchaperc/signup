/**
 * Created by mattchastain on 4/17/17.
 */
$(document).ready( () => {
    marmottajax({
        url: `http://127.0.0.1:8000/get_docs/`,
        method: 'get',
    }).success(function(result) {
        result = JSON.parse(result);
        console.log(result);
    }).error(function(message) {
        console.log(message);
    });
});
/**
 * 
 * @param {Array<Promise>} promises - Array de Promise.
 * @param {Boolean} all - Se true retorna tanto os Results quanto os Errors no Resolve.
 */
function PromiseAll(promises, all) {
    return new Promise(async (resolve, reject) => {
        let results = [];
        let errors = [];

        for (let i = 0; i < promises.length; i++) {
            await promises[i]
            .then(value => results.push(value))
            .catch(error => errors.push(error));
        }

        if (all) {
            resolve({
                results: results,
                errors: errors
            });
        }
        else if (errors.length > 0) {
            reject(errors);
        }
        else {
            resolve(results);
        }
    });
}

let promises = [
    Promise.resolve(0),
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.resolve(4),
    Promise.resolve(5),
    Promise.reject(6)
]

PromiseAll(promises, true)
.then(results => console.log(results))
.catch(errors => console.log(errors));
export function calcTotal(items) {
return items.reduce((s, it) => s + (it.price * it.qty), 0)
}


export function calcNewAverage(oldAvg, oldCount, newRating) {
const newCount = oldCount + 1
const newAvg = ((oldAvg * oldCount) + newRating) / newCount
return { newAvg: Number(newAvg.toFixed(2)), newCount }
}
import {tests} from "/assets/script/questions.js";

// ----------------------------------------------------- Constructor Class -----------------------------------------------

class Test1C {
	constructor(qst) {
		this.qst = qst[0]
		this.a1 = qst[1]
		this.a2 = qst[2]
		this.a3 = qst[3]
		this.a4 = qst[4]
		this.right = qst[5]
	}

	start() {
		question.innerHTML = this.qst
		a1l.innerHTML = `1. ${this.a1}`
		a2l.innerHTML = `2. ${this.a2}`
		a3l.innerHTML = `3. ${this.a3}`
		a4l.innerHTML = `4. ${this.a4}`
		wrongStats.innerHTML = `${arrWrong.length}`
		rightStats.innerHTML = `${arrRight.length}`
		percentStats.innerHTML = `Процент правильных ответов: ${Math.round(arrRight.length * 100 / (tests.length - 1))}%`
		qstCounter.innerHTML = `Вопрос ${index + 1} из ${tests.length}`
		document.querySelector('input[name="answer"]:checked').checked = false;
	}

	answer() {
		if (a1.checked === true && Number(a1.value) === this.right) {
			timeoutRefresh(true, 0)
		} else if (a1.checked === true && Number(a1.value) !== this.right) {
			timeoutRefresh(false, 0, this.right)
		} else if (a2.checked === true && Number(a2.value) === this.right) {
			timeoutRefresh(true, 1)
		} else if (a2.checked === true && Number(a2.value) !== this.right) {
			timeoutRefresh(false, 1, this.right)
		} else if (a3.checked === true && Number(a3.value) === this.right) {
			timeoutRefresh(true, 2)
		} else if (a3.checked === true && Number(a3.value) !== this.right) {
			timeoutRefresh(false, 2, this.right)
		} else if (a4.checked === true && Number(a4.value) === this.right) {
			timeoutRefresh(true, 3)
		} else if (a4.checked === true && Number(a4.value) !== this.right) {
			timeoutRefresh(false, 3, this.right)
		} else {
			popup.classList.add('visible')
		}
	}
}


// ----------------------------------------------------- DOM variables -----------------------------------------------

const question = document.querySelector('#question')
const a1 = document.querySelector('#a1')
const a2 = document.querySelector('#a2')
const a3 = document.querySelector('#a3')
const a4 = document.querySelector('#a4')
const a1l = document.querySelector('#a1l')
const a2l = document.querySelector('#a2l')
const a3l = document.querySelector('#a3l')
const a4l = document.querySelector('#a4l')
const answerBtn = document.querySelector('#answer-btn')
const rightStats = document.querySelector('.right')
const wrongStats = document.querySelector('.wrong')
const percentStats = document.querySelector('.percent')
const label = document.querySelectorAll('label')
const navBtn = document.querySelectorAll('.next-question')
const qstCounter = document.querySelector('#qst-counter')
const popupCloseBtn = document.querySelector('#popup-close')
const popup = document.querySelector('.popup')

// ----------------------------------------------------- Logic variables -----------------------------------------------


let index = 0;
let arrRight = []
let arrWrong = []

// ----------------------------------------------------- Counter -----------------------------------------------

function timeoutRefresh(logic, labelIndex, right) {
	if (logic === true) {
		index++
		arrRight.push(index)
		let timerId = setInterval(() => {
			label[labelIndex].classList.toggle('greenColor')
		}, 500)
		setTimeout(() => {
			clearInterval(timerId)
			label[labelIndex].classList.remove('greenColor')
			new Test1C(tests[index]).start()
		}, 3200)
	} else {
		index++
		arrWrong.push(index)
		label[labelIndex].style.color = 'red'
		setTimeout(() => {
			label[right - 1].style.color = 'green'
		}, 1500)
		setTimeout(() => {
			label[labelIndex].style.color = ''
			label[right - 1].style.color = ''
			new Test1C(tests[index]).start()
		}, 3500)
	}

}


// ----------------------------------------------------- Event listeners -----------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	index = 0;
	new Test1C(tests[0]).start()
})

document.addEventListener('click', (e) => {
	e.target.querySelector('input[name="answer"]:checked').checked = false;
})

navBtn.forEach(x => {
	if (x.id === 'back') {
		x.addEventListener('click', (e) => {
			e.preventDefault()
			index--
			new Test1C(tests[index]).start()
		})
	} else {
		x.addEventListener('click', (e) => {
			e.preventDefault()
			index++
			new Test1C(tests[index]).start()
		})
	}
})

popupCloseBtn.addEventListener('click', (e) => {
	popup.classList.remove('visible')
})

popup.addEventListener('click', (e) => {
	if (e.target.classList.contains('visible')) {
		popup.classList.remove('visible')
	}
})

answerBtn.addEventListener('click', (e) => {
	e.preventDefault()
	new Test1C(tests[index]).answer()
})
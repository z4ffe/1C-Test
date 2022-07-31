let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'
let request = new XMLHttpRequest();
request.open('GET', requestURL)
request.responseType = "json"
request.send()
request.onload = function () {
	let superHeroes = request.response
	console.log(superHeroes.members[0].name)
}


// DOM variables

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

// logic variables

let index = 0;
let arrRight = []
let arrWrong = []

// ----------------------------

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
			questionList[index].start()
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
			questionList[index].start()
		}, 3500)
	}

}

// ---------------------------

class Test1C {
	constructor(qst, a1, a2, a3, a4, right) {
		this.qst = qst
		this.a1 = a1
		this.a2 = a2
		this.a3 = a3
		this.a4 = a4
		this.right = right
	}

	start() {
		question.innerHTML = this.qst
		a1l.innerHTML = `1. ${this.a1}`
		a2l.innerHTML = `2. ${this.a2}`
		a3l.innerHTML = `3. ${this.a3}`
		a4l.innerHTML = `4. ${this.a4}`
		wrongStats.innerHTML = `${arrWrong.length}`
		rightStats.innerHTML = `${arrRight.length}`
		percentStats.innerHTML = `Процент правильных ответов: ${Math.round(arrRight.length * 100 / (questionList.length - 1))}%`
		qstCounter.innerHTML = `Вопрос ${index + 1} из ${questionList.length}`
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


// Event listeners  ------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	index = 0;
	questionList[index].start()
})

document.addEventListener('click', (e) => {
	e.target.querySelector('input[name="answer"]:checked').checked = false;
})

navBtn.forEach(x => {
	if (x.id === 'back') {
		x.addEventListener('click', (e) => {
			e.preventDefault()
			index--
			questionList[index].start()
		})
	} else {
		x.addEventListener('click', (e) => {
			e.preventDefault()
			index++
			questionList[index].start()
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
	questionList[index].answer()
})






// Question list --------------------------------

const test1 = new Test1C('При работе с разделом "Кадры" программы "1С:Зарплата и управление персоналом" имеются возможности:',
	'Вести кадровый учет сотрудников, учет штатного расписания, воинский учет',
	'Вести кадровый учет сотрудников',
	'Вести кадровый учет сотрудников и учет штатного расписания',
	'Вести кадровый учет и расчет зарплаты',
	3)

const test2 = new Test1C('При работе с разделом "Зарплата" программы "1С:Зарплата и управление персоналом" имеются возможности:',
	'Проводить различные виды начислений и удержаний, а также регистрировать выплату зарплаты',
	'Проводить различные виды начислений и удержаний, а также регистрировать отражение зарплаты в бухучете ',
	'Проводить различные виды начислений и удержаний, а также регистрировать выплату зарплаты и отражение зарплаты в бухучете',
	'Проводить различные виды начислений и удержаний, вводить документы по учету времени, а также регистрировать отражение зарплаты в бухучете',
	4)

const test3 = new Test1C('При работе с разделом "Выплаты" программы "1С:Зарплата и управление персоналом" имеются возможности:',
	'Вводить ведомости на выплату зарплаты',
	'Вводить ведомости на выплату зарплаты, а также регистрировать незарплатные доходы ',
	'Вводить ведомости на выплату зарплаты, а также регистрировать отражение зарплаты в бухучете',
	'Вводить ведомости на выплату зарплаты, а также регистрировать уплату страховых взносов ',
	4)

const test4 = new Test1C('При работе с разделом "Налоги и взносы" программы "1С:Зарплата и управление персоналом" имеются возможности:',
	'Проводить ежемесячный расчет налогов и взносов с выплат в пользу работников',
	'Вводить заявления на вычеты, формировать справки 2-НДФЛ, отражать возврат и перерасчет НДФЛ',
	'Регистрировать суммы перечисленного НДФЛ и взносов в ФСС',
	'Верны все вышеперечисленные варианты ',
	4)

let questionList = [test1, test2, test3, test4]

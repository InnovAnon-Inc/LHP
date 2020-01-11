class Model { /* empty */ }
class View {
	#mvc;
	constructor() { /* empty */ }
	set mvc(mvc)  { this.#mvc = mvc; }
	get mvc()     { return this.#mvc; }
}
class IdView extends View {
	#id;
	#element;
	constructor(id) {
		super();
		this.#id = id;
		this.#element = document.getElementById(id);
	}
	get id()      { return this.#id; }
	get element() { return this.#element; }
}
class Controller {
	#mvc;
	constructor() { /* empty */ }
	set mvc(mvc)  { this.#mvc = mvc; }
	get mvc()     { return this.#mvc; }
}
class MVC {
	#model;
	#view;
	#controller;
	constructor(model, view, controller) {
		this.#model      = model;
		this.#view       = view;
		this.#controller = controller;
		view.mvc         = this;
		controller.mvc   = this;
	}
	get model()      { return this.#model;      }
	get view()       { return this.#view;       }
	get controller() { return this.#controller; }
}
// class MVCGUI extends MVC { /* TODO */ }
// class MVCCLI extends MVC { /* TODO */ }



const SOLFEGGIO_DB = Object.freeze([
/*	freq     bg          fg */
	[174, "red",    "white"], //  0
	[471, "orange", "black"], //  1
	[285, "yellow", "white"], //  2
	[369, "green",  "black"], //  3
	[396, "blue",   "white"], //  4
	[258, "purple", "black"], //  5

	[417, "red",    "white"], //  6
	[147, "orange", "black"], //  7 - widdershin
	[528, "yellow", "white"], //  8 - ( 1, 0)
	[936, "green",  "black"], //  9 - deosil
	[639, "blue",   "white"], // 10
	[825, "purple", "black"], // 11

	[741, "red",    "white"], // 12
	[714, "orange", "black"], // 13
	[852, "yellow", "white"], // 14
	[693, "green",  "black"], // 15
	[963, "blue",   "white"], // 16
	[582, "purple", "black"], /* 17 - (-1, 0) */ ]);

class SolfeggioModel extends Model {
	#index;
	constructor(index = 8) {
		super();
		this.#index = index; // TODO use # ?
	}
	get index() { return this.#index; }
	set index(index) {
		//assert index >= 0 && index < SOLFEGGIO_DB.length;
		this.#index = index;
	}
}
class SolfeggioController extends Controller {
	constructor(mvc) { super(mvc); }
	selectIndex(index) {
		const mvc  = super.mvc;
		const view = mvc.view;
		mvc.model.index = index;
		view.draw();
		view.play();
	}
}
class SolfeggioGUI extends MVC {
	constructor(id) {
		const model      = new SolfeggioModel();
		const view       = new SolfeggioView(id);
		const controller = new SolfeggioController();
		super(model, view, controller);
		view.draw();
	}
}
class SolfeggioView extends IdView {
	#ctx;
	#elements = [];
	#polygons = [];
	//get elements() { return this.#elements; }
	constructor(mvc, id) {
		super(mvc, id);
		const canvas = super.element;
		this.#ctx    = canvas.getContext("2d");
		this.addElements();
		this.addPolygons();
		//canvas.addEventListener('click', event => (e => this.onClick(event, e)), false);
		//canvas.addEventListener('click', this.onClick, false);
		canvas.addEventListener('click', ((event) => this.onClick(event)).bind(this), false);
	}
	addElements() {
		const canvas = super.element;
		const w      = canvas.width;
		const h      = canvas.height;
		const w2     = w / 2;
		const h2     = h / 2;
		const d      = Math.min(w, h);
		const len    = SOLFEGGIO_DB.length;
		const r      = d / 2;
		const roff   = d / 7; // don't go smaller than 7
		const roff2  = roff / 2;
		const r2     = r - roff2;
		for(var i = 0; i < len; i++) {
			const theta = i / len * 2 * Math.PI;
			const x     = w2 + r2 * Math.cos(theta);
			const y     = h2 + r2 * Math.sin(theta);
			const entry = SOLFEGGIO_DB[(i + 8) % len];
			this.#elements.push([x, y, roff, entry]);
		}
	}
	addPolygons() {
		const canvas = super.element;
		const w      = canvas.width;
		const h      = canvas.height;
		const d      = Math.min(w, h);
		const w2     = w / 2;
		const h2     = h / 2;
		const len    = SOLFEGGIO_DB.length;
		const r      = d / 2;
		const roff   = d / 7; // don't go smaller than 7
		const roff2  = roff / 2;
		const r2     = r - roff2;
		const r3     = r - roff;
		for(var i = 0; i < len / 3; i++) {
			const theta   = i / len * 2 * Math.PI;
			const theta6  = (i +  6) / len * 2 * Math.PI;
			const theta12 = (i + 12) / len * 2 * Math.PI;
			this.#polygons.push([
				w2 + r3 * Math.cos(theta),   h2 + r3 * Math.sin(theta),
				w2 + r3 * Math.cos(theta6),  h2 + r3 * Math.sin(theta6),
				w2 + r3 * Math.cos(theta12), h2 + r3 * Math.sin(theta12), ]);
		}
	}
	drawOuterCircle(w2, h2, r) {
		const ctx       = this.#ctx;
		ctx.beginPath();
		ctx.arc(w2, h2, r, 0, 2 * Math.PI, false);
		ctx.strokeStyle = "black";
		ctx.lineWidth   = 3;
		ctx.closePath();
		ctx.stroke();
		// TODO fill middle background to match selected element's fill style
	}
	drawInnerCircle(w2, h2, r) {
		const ctx       = this.#ctx;
		ctx.beginPath();
		ctx.arc(w2, h2, r, 0, 2 * Math.PI, false);
		ctx.strokeStyle = "black";
		ctx.lineWidth   = 2;
		ctx.closePath();
		ctx.stroke();
		// TODO fill inner background to opposite selected element's text
	}
	drawElement(x, y, roff2, fillStyle) {
		const ctx       = this.#ctx;
		ctx.beginPath();
		ctx.arc(x, y, roff2, 0, 2 * Math.PI, false);
		ctx.strokeStyle = "black";
		ctx.lineWidth   = 1;
		ctx.stroke();
		ctx.fillStyle   = fillStyle;
		ctx.fill();
	}
	drawElementText(x, y, fillStyle, text) {
		const ctx        = this.#ctx;
		ctx.font         = '8pt Calibri';
		ctx.textAlign    = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle    = fillStyle
		ctx.fillText(text, x, y);
	}
	drawElements() {
		const ctx = this.#ctx;
		const len = this.#elements.length;
		for(var i = 0; i < len; i++) {
			const element = this.#elements[i];
			const x       = element[0];
			const y       = element[1];
			const roff    = element[2];
			const entry   = element[3];

			this.drawElement    (x, y, roff / 2, entry[1]);
			this.drawElementText(x, y, entry[2],  entry[0]);
		}
	}
	drawPolygons() {
		const ctx = this.#ctx;
		const len = this.#polygons.length;
		for(var i = 0; i < len; i++) {
			const polygon = this.#polygons[i];
			const entry   = SOLFEGGIO_DB[i % len];
			ctx.beginPath();
			/*
			ctx.moveTo(polygon[0][0], polygon[0][1]);
			ctx.lineTo(polygon[1][0], polygon[1][1]);
			ctx.lineTo(polygon[2][0], polygon[2][1]);
			ctx.lineTo(polygon[0][0], polygon[0][0]);
			*/
			ctx.moveTo(polygon[0], polygon[1]);
			ctx.lineTo(polygon[2], polygon[3]);
			ctx.lineTo(polygon[4], polygon[5]);
			ctx.lineTo(polygon[0], polygon[1]);
			ctx.closePath();
			ctx.strokeStyle = entry[1];
			ctx.lineWidth   = 1;
			ctx.lineJoin    = 'round';
			ctx.stroke();
		}
	}
	drawArrow (w2, h2, r3, len) {
		const ctx     = this.#ctx;
		const index2  = this.mvc.model.index;
		const theta2  = (index2 - 8) / len * 2 * Math.PI;
		const entry2  = SOLFEGGIO_DB[index2 % len];

		ctx.beginPath();
		ctx.moveTo(w2, h2);
		ctx.lineTo(w2 + r3 * Math.cos(theta2),  h2 + r3 * Math.sin(theta2));
		ctx.strokeStyle = "black"; // entry2[2];
		ctx.lineWidth   = 3;
		ctx.closePath();
		ctx.stroke();
	}
	draw() {
		const canvas = super.element;
		const ctx    = this.#ctx;
		//const w      = canvas.scrollWidth;
		//const h      = canvas.scrollHeight;
		const w      = canvas.width;
		const h      = canvas.height;
		const d      = Math.min(w, h);
		const w2     = w / 2;
		const h2     = h / 2;
		const r      = d / 2;
		const roff   = d / 7; // don't go smaller than 7
		const len    = SOLFEGGIO_DB.length;
		const r3     = r - roff;

		ctx.save();
		ctx.clearRect(0, 0, w, h);

		// TODO fill outer background to match selected element's text

		this.drawOuterCircle(w2, h2, r);
		this.drawInnerCircle(w2, h2, r3);
		this.drawElements();
		this.drawPolygons();
		this.drawArrow(w2, h2, r3, len);

		ctx.restore();
	}
	// TODO on mouse click, check which frequency is selected, then update base frequency selecting widget and play sound
	onClick(event) {
		const canvas     = super.element;
		const elemLeft   = canvas.offsetLeft;
		const elemTop    = canvas.offsetTop;
		//const x          = event.pageX - elemLeft;
		//const y          = event.pageY - elemTop;
		//const x          = elemLeft;
		//const y          = elemTop;

		var offsetX = event.offsetX;
		var offsetY = event.offsetY;

		if (event.target != canvas) { // 'this' is our HTMLElement
			offsetX = event.target.offsetLeft + event.offsetX;
			offsetY = event.target.offsetTop  + event.offsetY;
		}

		const x = offsetX;
		const y = offsetY;


		//console.log(elemLeft + ' ' + elemTop);
		const len        = this.#elements.length;
		const controller = this.mvc.controller;
		console.log(x + ' ' + y);
		for(var i = 0; i < len; i++) {
			const element = this.#elements[i];
			const x0      = element[0];
			const y0      = element[1];
			const er      = element[2];
			//console.log(i);
			console.log(x0 + ' ' + y0);
			console.log(Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)));
			console.log(er);
			if (Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) > er) continue;
			controller.selectIndex(i);
			//console.log(i);
			return;
		}
	}
}

const s = Object.freeze(new SolfeggioGUI('solfeggio'));
s.view.draw();

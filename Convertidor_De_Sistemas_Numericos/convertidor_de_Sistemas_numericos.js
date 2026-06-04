const Converter = {
    toDecimal: function(number, fromBase) {
        number = String(number).trim().toUpperCase();

        switch (fromBase) {
            case 'decimal':
                if (!/^[0-9]+$/.test(number)) throw new Error('Número decimal inválido');
                return parseInt(number, 10);
            case 'binary':
                if (!/^[01]+$/.test(number)) throw new Error('Número binario inválido');
                return parseInt(number, 2);
            case 'octal':
                if (!/^[0-7]+$/.test(number)) throw new Error('Número octal inválido');
                return parseInt(number, 8);
            case 'hexadecimal':
                if (!/^[0-9A-F]+$/.test(number)) throw new Error('Número hexadecimal inválido');
                return parseInt(number, 16);
            default:
                throw new Error('Sistema numérico no reconocido');
        }
    },

    fromDecimal: function(decimal, toBase) {
        decimal = parseInt(decimal, 10);
        if (isNaN(decimal)) throw new Error('Número decimal inválido');

        switch (toBase) {
            case 'decimal':
                return decimal.toString(10);
            case 'binary':
                return decimal.toString(2);
            case 'octal':
                return decimal.toString(8);
            case 'hexadecimal':
                return decimal.toString(16).toUpperCase();
            default:
                throw new Error('Sistema numérico no reconocido');
        }
    },

    generateProcedure: function(number, fromBase, targetBase, decimal) {
        const steps = [];
        const orderMap = {
            decimal: ['binary', 'octal', 'hexadecimal'],
            binary: ['octal', 'decimal', 'hexadecimal'],
            octal: ['binary', 'decimal', 'hexadecimal'],
            hexadecimal: ['binary', 'decimal', 'octal']
        };

        steps.push({
            title: `Resumen de la solución`,
            description: this.getSolutionOverview(number, fromBase, targetBase, decimal),
            result: this.fromDecimal(decimal, targetBase)
        });

        if (fromBase !== 'decimal') {
            steps.push({
                title: `Paso 1: Convertir de ${this.getBaseLabel(fromBase)} a Decimal`,
                description: this.getProcedureForToDecimal(number, fromBase),
                result: decimal
            });
        }

        const order = orderMap[fromBase] || orderMap.decimal;
        let stepNumber = fromBase === 'decimal' ? 1 : 2;

        order.forEach(base => {
            if (base === 'decimal' && fromBase !== 'decimal') return;
            if (base !== fromBase) {
                steps.push({
                    title: `Paso ${stepNumber}: Convertir de Decimal a ${this.getBaseLabel(base)}`,
                    description: this.getProcedureForFromDecimal(decimal, base),
                    result: this.fromDecimal(decimal, base)
                });
                stepNumber++;
            }
        });

        return steps;
    },

    getProcedureForToDecimal: function(number, base) {
        number = String(number).toUpperCase();
        let result = '';

        switch (base) {
            case 'binary':
                result = `<strong>Fórmula:</strong> Multiplica cada dígito por 2 elevado a su posición (de derecha a izquierda, comenzando en 0)<br><br>`;
                const binarySteps = [];
                for (let i = number.length - 1, pos = 0; i >= 0; i--, pos++) {
                    binarySteps.push(`${number[i]} × 2<sup>${pos}</sup> = ${number[i]} × ${Math.pow(2, pos)} = ${parseInt(number[i]) * Math.pow(2, pos)}`);
                }
                result += binarySteps.join(' + ');
                break;
            case 'octal':
                result = `<strong>Fórmula:</strong> Multiplica cada dígito por 8 elevado a su posición (de derecha a izquierda, comenzando en 0)<br><br>`;
                const octalSteps = [];
                for (let i = number.length - 1, pos = 0; i >= 0; i--, pos++) {
                    octalSteps.push(`${number[i]} × 8<sup>${pos}</sup> = ${number[i]} × ${Math.pow(8, pos)} = ${parseInt(number[i]) * Math.pow(8, pos)}`);
                }
                result += octalSteps.join(' + ');
                break;
            case 'hexadecimal':
                result = `<strong>Fórmula:</strong> Multiplica cada dígito por 16 elevado a su posición (de derecha a izquierda, comenzando en 0)<br><br>`;
                const hexSteps = [];
                for (let i = number.length - 1, pos = 0; i >= 0; i--, pos++) {
                    const digit = number[i];
                    const value = parseInt(digit, 16);
                    hexSteps.push(`${digit} × 16<sup>${pos}</sup> = ${value} × ${Math.pow(16, pos)} = ${value * Math.pow(16, pos)}`);
                }
                result += hexSteps.join(' + ');
                break;
        }

        return result;
    },

    getProcedureForFromDecimal: function(decimal, toBase) {
        let result = '';

        switch (toBase) {
            case 'binary':
                result = `<strong>Fórmula:</strong> Divide repetidamente entre 2 y guarda los residuos<br><br>`;
                result += this.getDivisionSteps(decimal, 2);
                result += `<br><strong>Resultado:</strong> Lee los residuos de abajo hacia arriba`;
                break;
            case 'octal':
                result = `<strong>Fórmula:</strong> Divide repetidamente entre 8 y guarda los residuos<br><br>`;
                result += this.getDivisionSteps(decimal, 8);
                result += `<br><strong>Resultado:</strong> Lee los residuos de abajo hacia arriba`;
                break;
            case 'hexadecimal':
                result = `<strong>Fórmula:</strong> Divide repetidamente entre 16 y guarda los residuos<br><br>`;
                result += this.getDivisionSteps(decimal, 16);
                result += `<br><strong>Resultado:</strong> Lee los residuos de abajo hacia arriba (A=10, B=11, C=12, D=13, E=14, F=15)`;
                break;
        }

        return result;
    },

    getDivisionSteps: function(num, base) {
        const steps = [];
        let temp = num;

        while (temp >= base) {
            const residue = temp % base;
            const residueChar = residue >= 10 ? String.fromCharCode(65 + residue - 10) : residue;
            const quotient = Math.floor(temp / base);
            steps.push(`${temp} ÷ ${base} = ${quotient} con residuo ${residueChar}`);
            temp = quotient;
        }

        steps.push(`${temp} ÷ ${base} = 0 con residuo ${temp >= 10 ? String.fromCharCode(65 + temp - 10) : temp}`);
        return steps.join('<br>');
    },

    getSolutionOverview: function(number, fromBase, targetBase, decimal) {
        const sourceLabel = this.getBaseLabel(fromBase);
        const targetLabel = this.getBaseLabel(targetBase);
        const targetValue = this.fromDecimal(decimal, targetBase);
        let overview = `<strong>Entrada:</strong> ${sourceLabel} ${number}<br>`;
        overview += `<strong>Ruta de conversión:</strong> ${sourceLabel} ${number} → Decimal ${decimal} → ${targetLabel} ${targetValue}<br>`;

        if (fromBase === 'hexadecimal' && targetBase === 'octal') {
            overview += `<br><strong>Nota:</strong> No se realiza una conversión directa de Hexadecimal a Octal sin un paso intermedio. `;
            overview += `Primero se convierte el valor hexadecimal a decimal, y luego ese decimal se convierte a octal. `;
            overview += `También es posible hacerlo por agrupación de bits (4 bits por dígito hexadecimal, 3 bits por dígito octal), pero aquí usamos el método de paso por Decimal para que quede más claro.`;
        } else if (fromBase !== 'decimal' && targetBase !== 'decimal') {
            overview += `<br><strong>Nota:</strong> Se usa Decimal como paso intermedio para convertir de ${sourceLabel} a ${targetLabel}.`;
        } else if (fromBase === 'decimal') {
            overview += `<br><strong>Nota:</strong> Desde Decimal se convierte directamente a ${targetLabel}.`;
        }

        return overview;
    },

    getBaseLabel: function(base) {
        const labels = {
            decimal: 'Decimal (Base 10)',
            binary: 'Binario (Base 2)',
            octal: 'Octal (Base 8)',
            hexadecimal: 'Hexadecimal (Base 16)'
        };
        return labels[base] || base;
    }
};

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => errorDiv.classList.remove('show'), 5000);
}

function hideError() {
    document.getElementById('errorMessage').classList.remove('show');
}

function convertNumber() {
    hideError();

    const numberInput = document.getElementById('numberInput').value.trim();
    const sourceSystem = document.getElementById('systemSelect').value;
    const targetSystem = document.getElementById('targetSelect').value;

    if (!numberInput) {
        showError('Por favor ingresa un número');
        return;
    }

    if (sourceSystem === targetSystem) {
        showError('El sistema de origen y destino no pueden ser iguales');
        return;
    }

    try {
        const decimal = Converter.toDecimal(numberInput, sourceSystem);

        const results = {
            decimal: Converter.fromDecimal(decimal, 'decimal'),
            binary: Converter.fromDecimal(decimal, 'binary'),
            octal: Converter.fromDecimal(decimal, 'octal'),
            hexadecimal: Converter.fromDecimal(decimal, 'hexadecimal')
        };

        displayResults(results, sourceSystem, targetSystem);
        const procedure = Converter.generateProcedure(numberInput, sourceSystem, targetSystem, decimal);
        displayProcedure(procedure);
    } catch (error) {
        showError('❌ ' + error.message);
    }
}

function displayResults(results, sourceSystem, targetSystem) {
    const resultGrid = document.getElementById('resultGrid');
    resultGrid.innerHTML = '';

    const systems = [
        { key: 'decimal', label: 'Decimal', icon: '10' },
        { key: 'binary', label: 'Binario', icon: '01' },
        { key: 'octal', label: 'Octal', icon: '8' },
        { key: 'hexadecimal', label: 'Hexadecimal', icon: 'FF' }
    ];

    systems.forEach(sys => {
        const card = document.createElement('div');
        card.className = `result-card ${sys.key}`;
        if (sys.key === targetSystem) {
            card.classList.add('selected');
        }
        card.innerHTML = `
            <div class="result-label">${sys.label}</div>
            <div class="result-value" id="result-${sys.key}">${results[sys.key]}</div>
            <button class="copy-btn" onclick="copyToClipboard('result-${sys.key}')">Copiar</button>
            <span class="copy-feedback" id="feedback-${sys.key}">¡Copiado!</span>
        `;
        resultGrid.appendChild(card);
    });

    const conversionSummary = document.getElementById('conversionSummary');
    conversionSummary.textContent = `De ${Converter.getBaseLabel(sourceSystem)} a ${Converter.getBaseLabel(targetSystem)}: ${results[targetSystem]}`;

    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
}

function displayProcedure(steps) {
    const procedureContent = document.getElementById('procedureContent');
    procedureContent.innerHTML = '';

    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.innerHTML = `
            <div style="display: flex; align-items: flex-start;">
                <span class="step-number">${index + 1}</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #333; margin-bottom: 8px;">${step.title}</div>
                    <div class="step-content">${step.description}</div>
                    <div class="step-code">
                        Resultado: <strong>${step.result}</strong>
                    </div>
                </div>
            </div>
        `;
        procedureContent.appendChild(stepDiv);
    });
}

function toggleProcedure() {
    const content = document.getElementById('procedureContent');
    const toggle = document.getElementById('procedureToggle');

    content.classList.toggle('show');
    toggle.classList.toggle('open');
}

function clearForm() {
    document.getElementById('numberInput').value = '';
    document.getElementById('systemSelect').value = 'decimal';
    document.getElementById('targetSelect').value = 'binary';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('conversionSummary').textContent = '';
    hideError();
    document.getElementById('procedureContent').classList.remove('show');
    document.getElementById('procedureToggle').classList.remove('open');
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const feedback = document.getElementById(`feedback-${elementId.split('-')[1]}`);
        feedback.style.display = 'inline';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }).catch(() => {
        showError('Error al copiar al portapapeles');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numberInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertNumber();
        }
    });
});

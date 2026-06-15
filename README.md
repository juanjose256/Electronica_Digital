# 🔢 Convertidor de Sistemas Numéricos

## Descripción

Un convertidor dinámico y profesional de sistemas numéricos desarrollado con HTML, CSS y JavaScript. Permite convertir números entre los cuatro sistemas numéricos más utilizados en electrónica digital e informática: **Decimal**, **Binario**, **Octal** y **Hexadecimal**.

## 🎯 Características

### Conversión Completa
- ✅ Conversión desde **Decimal** a Binario, Octal y Hexadecimal
- ✅ Conversión desde **Binario** a Decimal, Octal y Hexadecimal
- ✅ Conversión desde **Octal** a Decimal, Binario y Hexadecimal
- ✅ Conversión desde **Hexadecimal** a Decimal, Binario y Octal

### Procedimiento Detallado
- 📋 Muestra **paso a paso** cómo se realiza cada conversión
- 📊 Explica las **fórmulas matemáticas** utilizadas
- 🔍 Detalla los **divisiones y multiplicaciones** necesarias
- 💡 Enseña el **método de conversión** para cada sistema

### Interfaz Profesional
- 🎨 Diseño moderno con gradientes atractivos
- 📱 Totalmente **responsive** (funciona en móviles, tablets y escritorio)
- ⚡ Interfaz **intuitiva** y fácil de usar
- 🎯 Validación de entrada en tiempo real
- 📋 Copiar resultados al portapapeles con un clic

## 📋 Cómo Usar

1. **Abre el archivo** `convertidor_de_Sistemas_numericos.html` en tu navegador web
2. **Ingresa un número** en el campo de entrada
3. **Selecciona el sistema numérico** desde el que deseas convertir
4. **Haz clic en "Convertir"** o presiona Enter
5. **Ver procedimiento**: Haz clic en "📋 Ver Procedimiento Detallado" para ver paso a paso cómo se realiza la conversión
6. **Copiar resultados**: Usa el botón "Copiar" en cualquier resultado para copiarlo al portapapeles

### Ejemplos de Uso

| Número | Sistema | Binario | Octal | Hexadecimal |
|--------|---------|---------|-------|-------------|
| 255 | Decimal | 11111111 | 377 | FF |
| 10101 | Binario | 10101 | 25 | 15 |
| 755 | Octal | 111101101 | 755 | 1ED |
| A5 | Hexadecimal | 10100101 | 245 | A5 |

## 🔧 Características Técnicas

### Validación de Entrada
- **Decimal**: Solo acepta números enteros
- **Binario**: Solo acepta dígitos 0 y 1
- **Octal**: Solo acepta dígitos 0-7
- **Hexadecimal**: Acepta dígitos 0-9 y letras A-F (mayúsculas)

### Procedimiento de Conversión

#### Conversión de Cualquier Base a Decimal
Multiplica cada dígito por la base elevada a su posición:
```
Ejemplo: 1011 (Binario)
= 1×2³ + 0×2² + 1×2¹ + 1×2⁰
= 1×8 + 0×4 + 1×2 + 1×1
= 8 + 0 + 2 + 1
= 11 (Decimal)
```

#### Conversión de Decimal a Cualquier Base
Divide repetidamente entre la base y recolecta los residuos:
```
Ejemplo: 11 (Decimal) a Binario
11 ÷ 2 = 5 con residuo 1
5 ÷ 2 = 2 con residuo 1
2 ÷ 2 = 1 con residuo 0
1 ÷ 2 = 0 con residuo 1
Resultado: 1011 (leyendo los residuos de abajo hacia arriba)
```

## 🎨 Diseño Visual

### Paleta de Colores
- **Gradiente Principal**: Púrpura (#667eea) a Violeta (#764ba2)
- **Tarjeta Decimal**: Púrpura a Violeta
- **Tarjeta Binaria**: Rosa (#f093fb) a Rojo (#f5576c)
- **Tarjeta Octal**: Azul (#4facfe) a Cian (#00f2fe)
- **Tarjeta Hexadecimal**: Verde (#43e97b) a Turquesa (#38f9d7)

### Responsividad
- **Desktop (>768px)**: Grid de 4 columnas para resultados
- **Tablet (768px)**: Grid de 2 columnas
- **Móvil (<480px)**: Grid de 1 columna

## 📦 Contenido del Proyecto

```
/Actividad_Electronica/
├── convertidor_de_Sistemas_numericos.html  (Archivo principal)
└── README.md                                (Esta documentación)
```

## 🌐 Compatibilidad

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Opera 67+
- ✅ Navegadores móviles modernos

## 💡 Casos de Uso

Este convertidor es útil para:
- 👨‍🎓 **Estudiantes** de Electrónica Digital
- 👨‍💻 **Programadores** trabajando con sistemas numéricos
- 🔧 **Técnicos** en desarrollo de hardware
- 📚 **Docentes** explicando conversiones de bases
- 🧮 **Cualquiera** que necesite convertir números entre bases

## 🚀 Mejoras Futuras Posibles

- [ ] Agregar más sistemas numéricos (Base 32, Base 64, etc.)
- [ ] Historial de conversiones
- [ ] Modo oscuro
- [ ] Exportar resultados a PDF
- [ ] Visualización gráfica del proceso de conversión
- [ ] Soporte para números decimales
- [ ] Operaciones aritméticas entre sistemas

## 📝 Notas Importantes

- El convertidor trabaja con **números enteros**
- Los números muy grandes se pueden convertir correctamente
- La entrada se valida antes de procesar
- Los errores se muestran claramente en la interfaz
- El procedimiento se actualiza automáticamente con cada conversión

## 👨‍💼 Autor

Desarrollado como parte de la actividad de Electrónica Digital.

## 📄 Licencia

Este proyecto se proporciona libremente para uso educativo.

---

**¡Disfruta del Convertidor de Sistemas Numéricos!** 🎉
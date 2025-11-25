<template>
  <Previewer :component="DemoPropsVModel" :component-source="DemoPropsVModelSource">
    <template #header> Prop vModel </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsVModelFilter" :component-source="DemoPropsVModelFilterSource">
    <template #header> Prop filterValue </template>
    <template #description>
      Значение поля фильтрации. Фильтрует данные при конфигурации prop filter.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsOptions" :component-source="DemoPropsOptionsSource">
    <template #header> Prop Options </template>
    <template #description>
      Массив элементов для отображения в качестве доступных опций компонента.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsOptionLabel" :component-source="DemoPropsOptionLabelSource">
    <template #header> Prop OptionLabel </template>
    <template #description>
      Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если
      optionLabel не соответствует объектам в options.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsOptionValue" :component-source="DemoPropsOptionValueSource">
    <template #header> Prop OptionValue </template>
    <template #description>
      Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой
      опции, если не определен.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsLabel" :component-source="DemoPropsLabelSource">
    <template #header> Prop Label </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsId" :component-source="DemoPropsIdSource">
    <template #header> Prop Id </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsPlaceholder" :component-source="DemoPropsPlaceholderSource">
    <template #header> Prop Placeholder </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsTiles" :component-source="DemoPropsTilesSource">
    <template #header> Prop Tiles </template>
    <template #description> Выбранные значения отображаются в виде плиток. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoPropsMaxSelectedLabels"
    :component-source="DemoPropsMaxSelectedLabelsSource"
  >
    <template #header> Prop MaxSelectedLabels </template>
    <template #description>
      Определяет, сколько всего выбранных элементов следует отображать.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoPropsSelectedItemsLabel"
    :component-source="DemoPropsSelectedItemsLabelSource"
  >
    <template #header> Prop SelectedItemsLabel </template>
    <template #description>
      Label, который будет отображаться после превышения максимального количества выбранных
      элементов. Будет работать, только если задан prop `maxSelectedLabels`.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoPropsMultiselectCheckbox"
    :component-source="DemoPropsMultiselectCheckboxSource"
  >
    <template #header> Prop MultiselectCheckbox </template>
    <template #description>
      Включает и выключает управление чекбоксом для множественного выбора.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsDisabled" :component-source="DemoPropsDisabledSource">
    <template #header> Prop Disabled </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsLoading" :component-source="DemoPropsLoadingSource">
    <template #header> Prop Loading </template>
    <template #description> Находится ли компонент в состоянии загрузки. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsSize" :component-source="DemoPropsSizeSource">
    <template #header> Prop Size </template>
    <template #description> Предопределенные варианты размеров компонента. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsFilter" :component-source="DemoPropsFilterSource">
    <template #header> Prop Filter </template>
    <template #description>
      Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filter`.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoPropsVirtualScroller"
    :component-source="DemoPropsVirtualScrollerSource"
  >
    <template #header> Prop VirtualScroller </template>
    <template #description> Активирует использование VirtualScroller в списке опций. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsValid" :component-source="DemoPropsValidSource">
    <template #header> Prop Valid </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsInvalid" :component-source="DemoPropsInvalidSource">
    <template #header> Prop Invalid </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsErrors" :component-source="DemoPropsErrorsSource">
    <template #header> Prop Errors </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsCssClass" :component-source="DemoPropsCssClassSource">
    <template #header> Prop CssClass </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsModifier" :component-source="DemoPropsModifierSource">
    <template #header> Prop Modifier </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPropsAriaLabel" :component-source="DemoPropsAriaLabelSource">
    <template #header> Prop AriaLabel </template>
    <template #description>
      Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsLabel" :component-source="DemoSlotsLabelSource">
    <template #header> Slot Label </template>
    <template #description>
      Слот для отображения label, который будет заменять placeholder, а также текст выбранного
      значения.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsOptions" :component-source="DemoSlotsOptionsSource">
    <template #header> Slot Options </template>
    <template #description> Слот для отображения списка выбираемых опций. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsEmpty" :component-source="DemoSlotsEmptySource">
    <template #header> Slot Empty </template>
    <template #description>
      Слот для отображения контента при отсутствии доступных опций.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsTiles" :component-source="DemoSlotsTilesSource">
    <template #header> Slot Tiles </template>
    <template #description> Слот для отображения плиток выбранных значений. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoSlotsMultiselectCheckbox"
    :component-source="DemoSlotsMultiselectCheckboxSource"
  >
    <template #header> Slot MultiselectCheckbox </template>
    <template #description>
      Слот для отображения чекбокса для множественного выбора. Используется совместно с props
      `multiselectCheckbox`.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsFilterInput" :component-source="DemoSlotsFilterInputSource">
    <template #header> Slot FilterInput </template>
    <template #description>
      Слот для отображения кастомного input для фильтрации. Используется совместно с props filter и
      model-value-filter.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsEmptyFilter" :component-source="DemoSlotsEmptyFilterSource">
    <template #header> Slot EmptyFilter </template>
    <template #description>
      Слот для отображения контента, когда фильтрация не дала результатов.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsFilterIcon" :component-source="DemoSlotsFilterIconSource">
    <template #header> Slot FilterIcon </template>
    <template #description>
      Слот для отображения иконки фильтра рядом с input полем фильтрации.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsToggleIcon" :component-source="DemoSlotsToggleIconSource">
    <template #header> Slot ToggleIcon </template>
    <template #description>
      Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на
      содержимое слота cleanIcon.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsCleanIcon" :component-source="DemoSlotsCleanIconSource">
    <template #header> Slot CleanIcon </template>
    <template #description>
      Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsLoadingIcon" :component-source="DemoSlotsLoadingIconSource">
    <template #header> Slot LoadingIcon </template>
    <template #description> Слот для отображения иконки загрузки. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsLoading" :component-source="DemoSlotsLoadingSource">
    <template #header> Slot Loading </template>
    <template #description>
      Слот для отображения индикатора загрузки в элементе списка опций.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoSlotsErrors" :component-source="DemoSlotsErrorsSource">
    <template #header> Slot Errors </template>
    <template #description>
      Используется для вывода сообщений об ошибках. В props errors передаются ошибки, которые затем
      выводятся в слоте.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoEmitsUpdateModelValue"
    :component-source="DemoEmitsUpdateModelValueSource"
  >
    <template #header> Emit update:model-value </template>
    <template #description> Событие срабатывает при обновлении значения modelValue. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer
    :component="DemoEmitsUpdateFilterValue"
    :component-source="DemoEmitsUpdateFilterValueSource"
  >
    <template #header> Emit update:filter-value </template>
    <template #description> Событие срабатывает при обновлении значения filterValue. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoEmitsFocus" :component-source="DemoEmitsFocusSource">
    <template #header> Emit focus </template>

    <template #description> Событие срабатывает когда компонент получает фокусировку. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoEmitsBlur" :component-source="DemoEmitsBlurSource">
    <template #header> Emit blur </template>

    <template #description> Событие срабатывает когда компонент теряет фокусировку. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoPropsVModel from './demos/demo.props.v-model.vue';
import DemoPropsVModelSource from './demos/demo.props.v-model.vue?raw';
import DemoPropsVModelFilter from './demos/demo.props.v-model-filter.vue';
import DemoPropsVModelFilterSource from './demos/demo.props.v-model-filter.vue?raw';
import DemoPropsOptions from './demos/demo.props.options.vue';
import DemoPropsOptionsSource from './demos/demo.props.options.vue?raw';
import DemoPropsOptionLabel from './demos/demo.props.option-label.vue';
import DemoPropsOptionLabelSource from './demos/demo.props.option-label.vue?raw';
import DemoPropsOptionValue from './demos/demo.props.option-value.vue';
import DemoPropsOptionValueSource from './demos/demo.props.option-value.vue?raw';
import DemoPropsLabel from './demos/demo.props.label.vue';
import DemoPropsLabelSource from './demos/demo.props.label.vue?raw';
import DemoPropsId from './demos/demo.props.id.vue';
import DemoPropsIdSource from './demos/demo.props.id.vue?raw';
import DemoPropsPlaceholder from './demos/demo.props.placeholder.vue';
import DemoPropsPlaceholderSource from './demos/demo.props.placeholder.vue?raw';
import DemoPropsTiles from './demos/demo.props.tiles.vue';
import DemoPropsTilesSource from './demos/demo.props.tiles.vue?raw';
import DemoPropsMaxSelectedLabels from './demos/demo.props.max-selected-labels.vue';
import DemoPropsMaxSelectedLabelsSource from './demos/demo.props.max-selected-labels.vue?raw';
import DemoPropsSelectedItemsLabel from './demos/demo.props.selected-items-label.vue';
import DemoPropsSelectedItemsLabelSource from './demos/demo.props.selected-items-label.vue?raw';
import DemoPropsMultiselectCheckbox from './demos/demo.props.multiselect-checkbox.vue';
import DemoPropsMultiselectCheckboxSource from './demos/demo.props.multiselect-checkbox.vue?raw';
import DemoPropsDisabled from './demos/demo.props.disabled.vue';
import DemoPropsDisabledSource from './demos/demo.props.disabled.vue?raw';
import DemoPropsLoading from './demos/demo.props.loading.vue';
import DemoPropsLoadingSource from './demos/demo.props.loading.vue?raw';
import DemoPropsSize from './demos/demo.props.size.vue';
import DemoPropsSizeSource from './demos/demo.props.size.vue?raw';
import DemoPropsFilter from './demos/demo.props.filter.vue';
import DemoPropsFilterSource from './demos/demo.props.filter.vue?raw';
import DemoPropsVirtualScroller from './demos/demo.props.virtual-scroller.vue';
import DemoPropsVirtualScrollerSource from './demos/demo.props.virtual-scroller.vue?raw';
import DemoPropsValid from './demos/demo.props.valid.vue';
import DemoPropsValidSource from './demos/demo.props.valid.vue?raw';
import DemoPropsInvalid from './demos/demo.props.invalid.vue';
import DemoPropsInvalidSource from './demos/demo.props.invalid.vue?raw';
import DemoPropsErrors from './demos/demo.props.errors.vue';
import DemoPropsErrorsSource from './demos/demo.props.errors.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoPropsAriaLabel from './demos/demo.props.aria-label.vue';
import DemoPropsAriaLabelSource from './demos/demo.props.aria-label.vue?raw';
import DemoSlotsLabel from './demos/demo.slots.label.vue';
import DemoSlotsLabelSource from './demos/demo.slots.label.vue?raw';
import DemoSlotsOptions from './demos/demo.slots.options.vue';
import DemoSlotsOptionsSource from './demos/demo.slots.options.vue?raw';
import DemoSlotsEmpty from './demos/demo.slots.empty.vue';
import DemoSlotsEmptySource from './demos/demo.slots.empty.vue?raw';
import DemoSlotsTiles from './demos/demo.slots.tiles.vue';
import DemoSlotsTilesSource from './demos/demo.slots.tiles.vue?raw';
import DemoSlotsMultiselectCheckbox from './demos/demo.slots.multiselect-checkbox.vue';
import DemoSlotsMultiselectCheckboxSource from './demos/demo.slots.multiselect-checkbox.vue?raw';
import DemoSlotsFilterInput from './demos/demo.slots.filter-input.vue';
import DemoSlotsFilterInputSource from './demos/demo.slots.filter-input.vue?raw';
import DemoSlotsEmptyFilter from './demos/demo.slots.empty-filter.vue';
import DemoSlotsEmptyFilterSource from './demos/demo.slots.empty-filter.vue?raw';
import DemoSlotsFilterIcon from './demos/demo.slots.filter-icon.vue';
import DemoSlotsFilterIconSource from './demos/demo.slots.filter-icon.vue?raw';
import DemoSlotsToggleIcon from './demos/demo.slots.toggle-icon.vue';
import DemoSlotsToggleIconSource from './demos/demo.slots.toggle-icon.vue?raw';
import DemoSlotsCleanIcon from './demos/demo.slots.clean-icon.vue';
import DemoSlotsCleanIconSource from './demos/demo.slots.clean-icon.vue?raw';
import DemoSlotsLoadingIcon from './demos/demo.slots.loading-icon.vue';
import DemoSlotsLoadingIconSource from './demos/demo.slots.loading-icon.vue?raw';
import DemoSlotsLoading from './demos/demo.slots.loading.vue';
import DemoSlotsLoadingSource from './demos/demo.slots.loading.vue?raw';
import DemoSlotsErrors from './demos/demo.slots.errors.vue';
import DemoSlotsErrorsSource from './demos/demo.slots.errors.vue?raw';
import DemoEmitsUpdateModelValue from './demos/demo.emits.update-model-value.vue';
import DemoEmitsUpdateModelValueSource from './demos/demo.emits.update-model-value.vue?raw';
import DemoEmitsUpdateFilterValue from './demos/demo.emits.update-filter-value.vue';
import DemoEmitsUpdateFilterValueSource from './demos/demo.emits.update-filter-value.vue?raw';
import DemoEmitsFocus from './demos/demo.emits.focus.vue';
import DemoEmitsFocusSource from './demos/demo.emits.focus.vue?raw';
import DemoEmitsBlur from './demos/demo.emits.blur.vue';
import DemoEmitsBlurSource from './demos/demo.emits.blur.vue?raw';

definePageMeta({
  title: 'SelectMultiple',
  layout: 'default',
});

useHead({
  title: 'SelectMultiple',
});
</script>

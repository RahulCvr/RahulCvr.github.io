---
name: HomeWork 8
tools: [Python, HTML, vega-lite]
image: assets/pngs/cars.png
description: This is a "showcase" project that uses vega-lite for interactive viz!
custom_js:
  - vega.min
  - vega-lite.min
  - vega-embed.min
  - justcharts
---


# Homework 8
## Viz 1

<br>

<vegachart schema-url="{{ site.baseurl }}/assets/json/viz1.json" style="width: 100%"></vegachart>

<br>

### Bar Chart of Presence of Businesses:

#### Description:
This bar chart visualizes the count of businesses based on the presence or absence of a business name in the dataset.

#### Design Choices:
- Vizualization done using vegalite then used Python+Altair to read the dictionary and convert it into a JSON file.
- **Encoding Types:**
  - X-axis represents the presence or absence of a business name (Business Y/N), chosen type : nominal.
  - Y-axis represents the count of businesses, chosen type : quantitative.
  - Color distinguishes between the two categories.

- **Color Scheme:**
  - A binary color scheme (e.g., blue and orange) represents Yes/No categories.

#### Data Transformations:
- The count of businesses is calculated based on the presence or absence of a business name.

#### Interactivity:
- The chart is static without specific interactivity for simplicity.
- Additional interactivity (e.g., selection) can be added based on specific needs.



<!-- these are written in a combo of html and liquid --> 

<div class="left">
{% include elements/button.html link="https://github.com/vega/vega/blob/main/docs/data/cars.json" text="The Data" %}
</div>

<div class="right">
{% include elements/button.html link="https://github.com/jnaiman/online_cv_public/blob/main/python_notebooks/test_generate_plots.ipynb" text="The Analysis" %}
</div>

<br>
<br>

## Viz 2

<br>

<vegachart schema-url="{{ site.baseurl }}/assets/json/viz2.json" style="width: 100%"></vegachart>

<br>

### Pie Chart of License Types:

#### Description:
This pie chart visualizes the distribution of license types in a dataset, with the ability to interactively select specific license types for a more focused analysis.

#### Design Choices:
- Vizualization done using Python+Altair and then exported to JSON.
- **Encoding Types:**
  - Theta (angle) encodes the count of license types.
  - Color distinguishes different license types.
  - Selected type is highlighted and others are greyed.
  - Tooltip includes license type and count for additional information.

- **Color Scheme:**
  - A categorical color scheme is used to differentiate license types.

#### Data Transformations:
- The count of license types is calculated from the dataset.
- A new category "Others" is created for license types with counts less than 100.

#### Interactivity:
- Users can select specific license types by clicking on the legend.
- Selection highlights chosen license type, aiding in a more detailed analysis.
- Tooltip complements the selection interaction by showing the license type and count.
- To de-select, click on anything outside the legend

<!-- these are written in a combo of html and liquid --> 

<div class="left">
{% include elements/button.html link="https://github.com/vega/vega/blob/main/docs/data/cars.json" text="The Data" %}
</div>

<div class="right">
{% include elements/button.html link="https://github.com/jnaiman/online_cv_public/blob/main/python_notebooks/test_generate_plots.ipynb" text="The Analysis" %}
</div>
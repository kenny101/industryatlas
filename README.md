# Industry Atlas

A major code refactor of [cbp-visualizer](https://github.com/kenny101/cbp-visualizer)

<b> Industry is still ongoing development. Awaiting backend deployment.</b> 
![industry-atlas](https://github.com/kenny101/industryatlas/assets/53395124/f755afa8-c7ba-4b20-b0b3-926ca01f8ccc)
[View the website here](https://industryatlas.vercel.app/)

## Background
This project contains code for the website accompanying the paper ["Imputing Missing Values in the US Census Bureau's County Business Patterns"](http://fpeckert.me/cbp/efsy.pdf) 
written by Eckert et. al.

The county business patterns dataset, containing yearly employment data broken down by industry throughout every county in the United States, has potential to 
offer critical insights on employment patterns throughout the United States, but suffers from the limitation that many of the values are suppressed to preserve anonymity.
Eckert et. al. address this issue by applying a linear programming method to estimate these missing values from the years 1975 to 2016.

## Website overview
This website displays the full employment data (including estimated values) from 1975 to 2016 in an interactive map.
The slider at the top of the page allows users to select the year they're interested in, and view data for the entire country at this level.
Users have a few different options they can select from when choosing how they'd like to view the data, outlined below.

**Sector-specific view**. 
Users can choose to view the data by first selecting a specific sector, at which point the map displays each county's total number of employees working in
the selected sector, along with the proportion of that county's workers who are employed by the selected sector. The counties are color-coded based on their number of employees working in the selected sector, with the colors corresponding to octiles of the data (i.e., the counties are ordered by number of workers, then divided into 8 groups of equal size).

**County-level overview**. 
Users can also choose to view the an overview of each county's data, which displays the a list of the county's 10 largest employers, along with the total
number of workers employed in each of these sectors (and the proportion of the county's workers who are employed in the respective sector).

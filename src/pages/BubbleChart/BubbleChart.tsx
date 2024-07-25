import { useEffect, useRef } from 'react'
// import { Types } from './BubbleChart/types'
import * as d3 from 'd3'
// import { Simulation, SimulationNodeDatum } from 'd3'
import axios from 'axios'
import {Link} from 'react-router-dom'
import SearchBar from '../../modules/core/components/SearchBar.tsx'
 
const BubbleChart:React.FC = () => {


  const svgRef = useRef<SVGSVGElement | null>(null)

  const innerWidth = window.innerWidth - 296
  const width = innerWidth
  const parentHeight = svgRef?.current?.parentElement?.clientHeight ?? 0;

  const height = parentHeight

  interface Coin {
    id:string 
    symbol:string 
    image:string 
    price_change_percentage_24h:number
  }
  interface Price extends d3.SimulationNodeDatum {
    id:string 
    symbol:string 
    image:string 
    priceChangePercentage:number
    priceChange:string
  }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isPrice = (obj: any): obj is Price  => 'x' in obj && 'y' in obj && 'priceChangePercentage' in obj

  useEffect(() => {

    const getCoins = async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en&apiKey=CG-QbZkDScotX6kxauUGJRokS12')
      const prices:Price[] = response.data.map((coin:Coin) => ({id: coin.id, symbol: coin.symbol, 
        image: coin.image, priceChangePercentage: coin.price_change_percentage_24h, priceChange: coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'})
      )

      return prices
    }

    const drawChart = async () => {

      const coins = await getCoins()
            
      if(!svgRef.current) return
      const svg = d3.select(svgRef.current)


      svg.attr("width", width)
      .attr("height", parentHeight)
      svg.selectAll("*").remove();
      
    const colorRange = ["url(#negativeGradient)", 'url(#positiveGradient'];
    const color = d3.scaleOrdinal()
      .domain(["negative", "positive"])
      .range(colorRange);
  

      const minPriceChangePercentage = d3.min(coins, (d:Price) => d.priceChangePercentage);
      const maxPriceChangePercentage = d3.max(coins, (d:Price) => d.priceChangePercentage);

      const domainMin = minPriceChangePercentage ?? 0;
      const domainMax = maxPriceChangePercentage ?? 0; 

    const size = d3.scaleLinear<number>()
      .domain([domainMin, domainMax])
      .range([20,125]) 


    const node = svg.append("g")
      .selectAll("g")
      .data(coins)
      .enter()
      .append("g")
      .attr("class", "node")
      
      node.append('circle')
      .attr("r", d => size(d.priceChangePercentage))
      .style("fill", (d) => { if(isPrice(d)) {return color(d.priceChange) as string }else return 0})
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .call(d3.drag<SVGCircleElement, Price>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
      .on("click", handleClick);
      
      // const clipPath = svg.append("defs")
      // .append("clipPath")
      // .attr("id", "clipCircle")
      // .append("circle")
      // .attr("cx", d => d.x)
      // .attr("cy", d => d.x)
      // .attr("r", (d) => size(d.priceChangePercentage) + 3);

    node.append("image")
      .attr("xlink:href", d => d.image)
      .attr("x", d => d.x as number )
      .attr("y", d => d.y as number)
      .attr("width", d => size(d.priceChangePercentage)) 
      .attr("height", d => size(d.priceChangePercentage))
      .attr("clip-path", "url(#clipCircle)")


    
    node.append('text')
      .text(d => d.symbol)
      .attr("text-anchor", "middle")
      .attr("color", "white")
      .attr("font-size", d => `24px - ${size(d.priceChangePercentage)}`)
      .attr("fill", "white")
      .style("font-family", "IBM Plex Sans,sans-serif")
      .style("text-transform", "uppercase")
      .attr("dy", 4) 
      .style("user-select", "none");

    node.append('text')
      .text(d => d.priceChangePercentage)
      .attr("font-size", "12px")
          // .attr("dy", d => size(d.priceChangePercentage) / 2)
      .attr("dy", 4)
      .style("user-select", "none")
      .style("user-select", "none");
      const negativeGradient = svg.append("defs")
      .append("radialGradient")
      .attr("id", "negativeGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");
      
      negativeGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#462025")
      .attr("stop-opacity", 0);
    
      negativeGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#462025")
      .attr("stop-opacity", 1);

      const positiveGradient = svg.append("defs")
      .append("radialGradient")
      .attr("id", "positiveGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");
    
      positiveGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1e402f")
      .attr("stop-opacity", 0);
    
      positiveGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#1e402f")
      .attr("stop-opacity", 1);

      

const radius = (d:Price) => size(d.priceChangePercentage) + 3
// Features of the forces applied to the nodes:
const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))
    .force("charge", d3.forceManyBody().strength(.1)) 
    .force("collide", d3.forceCollide().strength(.2)
    // .radius((d) => radius(d))
    .radius((d) => radius(d as Price))
    .iterations(1)) // Force that avoids circle overlapping


// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(coins as Price[])
    .on("tick", () => {
      node.selectAll("circle")
          .attr("cx", (d) => {if(isPrice(d)) {return d.x = Math.max(radius(d), Math.min(width - radius(d), d.x as number))} else return 0})
          .attr("cy", (d) => {if(isPrice(d)) { return d.y = Math.max(radius(d as Price), Math.min(height - radius(d as Price), d.y as number)) }else return 0});
      node.selectAll("image")
          .attr("x", (d) => {if(isPrice(d)) { return d.x as number - 25} else return 0})
          .attr("y", (d) => {if(isPrice(d)) { return d.y as number - size(d.priceChangePercentage)} else return 0});
      node.selectAll("text")
          .attr("x", (d) => {if(isPrice(d)) { return d.x as number } else return 0})
          .attr("y", (d) => {if(isPrice(d)) { return d.y as number + 20} else return 0})
    });


  function dragstarted(event:d3.D3DragEvent<SVGCircleElement, Price, SVGGElement>, d:Price) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event:d3.D3DragEvent<SVGCircleElement, Price, SVGGElement>, d:Price) {
    d.fx = event.x > width ? width : event.x;
    d.fy = event.y > width ? width : event.y;
    // d.fx = Math.min(size(d.priceChangePercentage), Math.max(width - size(d.priceChangePercentage), d.fx));
    //  d.fy = Math.min(size(d.priceChangePercentage), Math.max(height - size(d.priceChangePercentage), d.fy));
  }
  function dragended(event:d3.D3DragEvent<SVGCircleElement, Price, SVGGElement>, d:Price) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }
}

  drawChart()

  }, [])

  const handleClick = (d:Price) => {
    return <Link to={`/coin/${d.id}`} />
  }
  
  const filters = ['1 hour', '24 Hours', '7 Days', '30 Days', '1 Year']
  return (
    <>
    <main className="w-[calc(100%-280px)] h-screen bg-[#06111d]">
      <SearchBar />
      <div className="h-[8%]">
        <div className="h-[6%] flex justify-center pt-4">
          {filters.map(filter => 
            <button key={filter} className={`bg-[#0D2035] text-xs px-2 h-7 px-2 ${filter === '1 hour' ? 'rounded-l-md' : filter === '1 Year' ? 'rounded-r-md' : ''}`}><span className="text-[#2E628E]">
              {filter}
              </span>
            </button>)}
        </div>
      </div>
        <div className="h-[80%] pt-4 pb-16 px-2">
          <svg ref={svgRef}></svg>
          <div className="w-full h-12"></div>
        </div>
    </main>
    </>
)
}

export default BubbleChart

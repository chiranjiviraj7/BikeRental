using BikeRentalAPI.Models;
using BikeRentalAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikeController : ControllerBase
    {
        private readonly IBikeService _bikeService;

        public BikeController(IBikeService bikeService)
        {
            _bikeService = bikeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bike>>> GetBikes()
        {
            return Ok(await _bikeService.GetBikesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bike>> GetBike(int id)
        {
            var bike = await _bikeService.GetBikeByIdAsync(id);
            if (bike == null) return NotFound();
            return bike;
        }

        [HttpGet("getUniqueBrands")]
        public async Task<ActionResult<IEnumerable<string>>> GetUniqueBrands()
        {
            var brands = await _bikeService.GetUniqueBrandsAsync();
            return Ok(brands);
        }

        [HttpGet("getUniqueType")]
        public async Task<ActionResult<IEnumerable<string>>> GetUniqueType()
        {
            var type = await _bikeService.GetUniqueTypeAsync();
            return Ok(type);
        }

        [HttpPost]
        public async Task<ActionResult<Bike>> AddBike(Bike bike)
        {
            var createdBike = await _bikeService.AddBikeAsync(bike);
            return CreatedAtAction(nameof(GetBike), new { id = createdBike.BikeId }, createdBike);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateBikeStatus(int id, [FromBody] StatusUpdateModel statusUpdate)
        {
            var result = await _bikeService.UpdateBikeStatusAsync(id, statusUpdate.Status);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}/rentalAmount")]
        public async Task<IActionResult> UpdateRentalAmount(int id, [FromBody] int rentalAmount)
        {
            var result = await _bikeService.UpdateRentalAmountAsync(id, rentalAmount);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}/count")]
        public async Task<IActionResult> UpdateBikeCount(int id, [FromBody] int countUpdate)
        {
            var result = await _bikeService.UpdateBikeCountAsync(id, countUpdate);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBike(int id)
        {
            var result = await _bikeService.DeleteBikeAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}

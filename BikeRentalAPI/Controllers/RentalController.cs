using BikeRentalAPI.Models;
using BikeRentalAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BikeRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService _rentalService;

        public RentalController(IRentalService rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rent>>> GetRentals()
        {
            var rentals = await _rentalService.GetRentalsAsync();
            return Ok(rentals);
        }

        [HttpPost("rent")]
        public async Task<IActionResult> RentBike(RentRequestModel model)
        {
            try
            {
                var rental = await _rentalService.RentBikeAsync(model);
                return Ok(rental);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("return")]
        public async Task<IActionResult> ReturnBike([FromBody] ReturnRequestModel model)
        {
            try
            {
                var cost = await _rentalService.ReturnBikeAsync(model);
                return Ok(cost);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<Customer>> GetCustomerByName(string name)
        {
            try
            {
                var customer = await _rentalService.GetCustomerByNameAsync(name);
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("by-customer")]
        public async Task<ActionResult<IEnumerable<Rent>>> GetRentalsByCustomer([FromQuery] string name, [FromQuery] string phone)
        {
            try
            {
                var rentals = await _rentalService.GetRentalsByCustomerAsync(name, phone);
                return Ok(rentals);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("history/{bikeId}")]
        public async Task<IActionResult> GetRentalHistory(int bikeId)
        {
            try
            {
                var rentalHistory = await _rentalService.GetRentalHistoryAsync(bikeId);
                return Ok(rentalHistory);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("customers-by-bike/{bikeId}")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersByBike(int bikeId)
        {
            try
            {
                var customers = await _rentalService.GetCustomersByBikeAsync(bikeId);
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("GetActiveRentals")]
        public async Task<IActionResult> GetActiveRentals()
        {
            try
            {
                var activeRentals = await _rentalService.GetActiveRentalsAsync();
                if (activeRentals == null || !activeRentals.Any())
                {
                    return NotFound("No active rentals found.");
                }
                return Ok(activeRentals); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}

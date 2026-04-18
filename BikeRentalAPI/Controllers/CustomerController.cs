using BikeRentalAPI.Models;
using BikeRentalAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return Ok(await _customerService.GetCustomersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            if (customer == null) return NotFound();
            return customer;
        }

        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<Customer>> GetCustomerByName(string name)
        {
            var customer = await _customerService.GetCustomerByNameAsync(name);
            if (customer == null) return NotFound("Customer not found.");
            return Ok(customer);
        }

        [HttpGet("byNameAndPhone")]
        public async Task<ActionResult<Customer>> GetCustomerByNameAndPhone(string name, string phone)
        {
            var customer = await _customerService.GetCustomerByNameAndPhoneAsync(name, phone);
            if (customer == null) return NotFound();
            return customer;
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer)
        {
            var createdCustomer = await _customerService.AddCustomerAsync(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.CustId }, createdCustomer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            var result = await _customerService.UpdateCustomerAsync(id, customer);
            if (!result) return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var result = await _customerService.DeleteCustomerAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}

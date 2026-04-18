using BikeRentalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BikeRentalAPI.Database
{
    public class BikeRentContext : DbContext
    {
        public BikeRentContext(DbContextOptions<BikeRentContext> options) : base(options) { }

        public DbSet<Bike> Bike { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Rent> Rent { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rent>()
                .HasOne(r => r.Bike)
                .WithMany()
                .HasForeignKey(r => r.BikeId);

            modelBuilder.Entity<Rent>()
                .HasOne(r => r.Customer)
                .WithMany()
                .HasForeignKey(r => r.CustId);
        }
    }
}

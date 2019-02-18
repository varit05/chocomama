<template>
  <aside>
    <p>Filter 1</p>
    <div class="card">
      <article class="card-group-item">
        <header class="card-header"><h6 class="title">Brands</h6></header>
        <div class="filter-content">
          <div class="card-body">
            <form>
              <label class="form-check">
                <input class="form-check-input" type="checkbox" value="Amul" />
                <span class="form-check-label">Amul </span>
              </label>
              <!-- form-check.// -->
              <label class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="Nestle"
                />
                <span class="form-check-label"> Nestle </span>
              </label>
              <!-- form-check.// -->
              <label class="form-check">
                <input class="form-check-input" type="checkbox" value="Lindt" />
                <span class="form-check-label"> Lindt </span>
              </label>
              <!-- form-check.// -->
            </form>
          </div>
          <!-- card-body.// -->
        </div>
      </article>
      <!-- card-group-item.// -->

      <article class="card-group-item">
        <header class="card-header"><h6 class="title">Choose type</h6></header>
        <div class="filter-content">
          <div class="card-body">
            <label class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadio"
                value=""
              />
              <span class="form-check-label"> First hand items </span>
            </label>
            <label class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadio"
                value=""
              />
              <span class="form-check-label"> Brand new items </span>
            </label>
            <label class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadio"
                value=""
              />
              <span class="form-check-label"> Some other option </span>
            </label>
          </div>
          <!-- card-body.// -->
        </div>
      </article>
      <!-- card-group-item.// -->
      <article class="card-group-item">
        <header class="card-header"><h6 class="title">Selection</h6></header>
        <div class="filter-content">
          <div class="card-body">
            <div class="custom-control custom-checkbox">
              <span class="float-right badge badge-light round">52</span>
              <input type="checkbox" class="custom-control-input" id="Check1" />
              <label class="custom-control-label" for="Check1">Samsung</label>
            </div>
            <!-- form-check.// -->

            <div class="custom-control custom-checkbox">
              <span class="float-right badge badge-light round">132</span>
              <input type="checkbox" class="custom-control-input" id="Check2" />
              <label class="custom-control-label" for="Check2"
                >Black berry</label
              >
            </div>
            <!-- form-check.// -->

            <div class="custom-control custom-checkbox">
              <span class="float-right badge badge-light round">17</span>
              <input type="checkbox" class="custom-control-input" id="Check3" />
              <label class="custom-control-label" for="Check3">Samsung</label>
            </div>
            <!-- form-check.// -->

            <div class="custom-control custom-checkbox">
              <span class="float-right badge badge-light round">7</span>
              <input type="checkbox" class="custom-control-input" id="Check4" />
              <label class="custom-control-label" for="Check4"
                >Other Brand</label
              >
            </div>
            <!-- form-check.// -->
          </div>
          <!-- card-body.// -->
        </div>
      </article>
      <!-- card-group-item.// -->
    </div>
    <!-- card.// -->
  </aside>
</template>
<script>
export default {
  name: "ProductFilter"
};
</script>

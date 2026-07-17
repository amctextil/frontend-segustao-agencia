<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout name="main">
    <div class="d-flex pa-4 ga-4 flex-column overflow-auto">
      <div class="d-flex ga-4">
        <v-carousel v-model="selectedImageIdx">
          <v-carousel-item
            v-for="media in medias"
            :key="media.MediaPath"
            :src="'https://d3vnyi5j6ba1mc.cloudfront.net' + media.MediaPath"
          />
        </v-carousel>

        <div class="d-flex flex-column ga-4">
          <h1 class="text-display-small">{{ product.Name }}</h1>

          <span>Ref: {{ product.IntegrationID }}</span>

          <div
            v-for="(option, index) in product.Options"
            :key="option.Label"
            class="d-flex flex-column ga-2"
          >
            <span class="text-grey">
              {{ option.Label }}:
              <span class="text-grey-darken-1 font-weight-bold">
                {{ options[option.Label]?.Text }}
              </span>
            </span>
            <span
              v-if="
                index === product.Options.length - 1 && inStockCount !== null
              "
            >
              {{ inStockCount }} em estoque
            </span>

            <div class="d-flex flex-row flex-wrap ga-4">
              <ProductOptionItem
                v-for="item in option.Values"
                :key="item.Text + item.PropertyPath"
                :model-value="item"
                :is-selected="
                  options[option.Label]?.PropertyPath === item.PropertyPath
                "
                :disabled="
                  option.Label.startsWith('Cor')
                    ? !inStockVariations?.some((variant) =>
                        variant.VariationPath.includes(item.PropertyPath),
                      )
                    : !sizesVariations?.some((variant) =>
                        variant.VariationPath.includes(item.PropertyPath),
                      )
                "
                @click="selectOption(option, item)"
              />
            </div>
          </div>

          <span
            v-if="product.PromotionPrice"
            class="text-grey text-decoration-line-through"
          >
            {{ WDFormatters.formatCurrency(product.ListPrice) }}
          </span>

          <span class="text-display-small font-weight-bold">
            {{
              product.PromotionPrice
                ? WDFormatters.formatCurrency(product.PromotionPrice)
                : WDFormatters.formatCurrency(product.ListPrice)
            }}
          </span>

          <v-btn> Adicionar </v-btn>
        </div>
      </div>

      <div v-for="desc in descriptions" :key="desc.Alias" v-html="desc.Value" />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';
import { ProductService } from '~/services/product.service';
import type {
  SCNOptionValue,
  SCNProductOption,
} from '~~/shared/interfaces/SCNProductProps';

const route = useRoute();
const { user } = useUserSession();
const selectedImageIdx = ref(0);

const productUrl = route.params.url as string;

const product = await ProductService.getProductByUrl(
  productUrl,
  user.value!.appId,
);

if (!product) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Produto não encontrado',
  });
}

const inStockVariations = computed(() =>
  product?.Items.filter(
    (item) => item.VariationPath.replace('//', '') && item.Availability === 'I',
  ),
);

const colorOption = product?.Options.find((opt) => opt.Label.startsWith('Cor'));
const initialColor = colorOption?.Values.find((opt) =>
  inStockVariations.value?.some((stock) =>
    stock.VariationPath.includes(opt.PropertyPath),
  ),
);

const options = ref<Record<string, SCNOptionValue | undefined>>({
  Cor: initialColor,
});

const medias = computed(() => {
  const allMedias = product.Medias.filter(
    (media) => media.MediaSizeType === 'Medium',
  );

  if (!options.value.Cor) {
    return allMedias;
  }

  const variantMedias = allMedias?.filter(
    (media) =>
      !!(
        options.value.Cor &&
        media.VariationPath.includes(options.value.Cor.PropertyPath)
      ),
  );

  return variantMedias?.length ? variantMedias : allMedias;
});

watch([medias], () => {
  selectedImageIdx.value = 0;
});

const sizesVariations = computed(() =>
  inStockVariations.value?.filter((item) =>
    !options.value.Cor
      ? true
      : item.VariationPath.includes(options.value.Cor.PropertyPath),
  ),
);
const inStockCount = computed(() => {
  const isEveryOptionSelected = !!product?.Options.every(
    (opt) => options.value[opt.Label],
  );

  if (!isEveryOptionSelected) {
    return null;
  }

  const variantSelected = product?.Items.find((item) =>
    Object.values(options).every((opt) => item.VariationPath.includes(opt)),
  );

  if (!variantSelected) {
    return null;
  }

  const productCart = { Quantity: 0 };
  const inCartCount = productCart?.Quantity || 0;
  // TODO descomentar quando implementar sistema de carrinho
  // items.find(
  //   (item) => item.VariationPath === variantSelected.VariationPath,
  // );

  return variantSelected.StockBalance - inCartCount;
});

const descriptions = product.Descriptions.filter((item) => item.Value);

const selectOption = (option: SCNProductOption, selected: SCNOptionValue) => {
  // if (option.Label.startsWith('Cor')) {
  //   options.value = { [option.Label]: selected };
  //   return;
  // }

  options.value[option.Label] = selected;
};
</script>

<style></style>
